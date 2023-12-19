import type { NextApiRequest, NextApiResponse } from 'next'
import { EquivalentValue } from 'types/equivalent'
import { ZodError, z } from 'zod'
import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import { computeECV, computeFootprint } from 'utils/computeECV'
import { trackAPIRequest } from 'utils/middleware'

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
]

const categoryValidation = z.object({
  id: z.string(),
  detail: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     ECV:
 *       type: object
 *       required:
 *       - name
 *       - ecv
 *       - slug
 *       properties:
 *         name:
 *           type: string
 *           example: Eau en bouteille
 *         ecv:
 *           type: number
 *           description: l'emission totale en g de CO2e
 *           example: 50.3
 *         slug:
 *           type: string
 *           example: eauenbouteille
 *         footprint:
 *           type: number
 *           description: l'emission de base de l'objet en g de CO2e [disponible uniquement en mode détaillé]
 *           example: 45.2
 *         footprintDetail:
 *           description: l'emission de base détaillé de l'objet en g de CO2e [disponible uniquement en mode détaillé]
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: |-
 *                   id du poste détaillé
 *                   - 1: Matières premières
 *                   - 2: Approvisionnement
 *                   - 3: Mise en forme
 *                   - 4: Assemblage et distribution
 *                   - 5: Construction
 *                   - 6: Carburant
 *                   - 7: Trainées de condensation
 *                   - 8: Usage
 *                   - 13: Construction des terminaux
 *                   - 14: Usage des terminaux
 *                   - 15: Transmission
 *                   - 16: Construction des data-centers
 *                   - 17: Usage des data-centers
 *                   - 30: Agriculture
 *                   - 31: Transformation
 *                   - 32: Emballage
 *                   - 33: Transport
 *                   - 34: Supermarché et distribution
 *                   - 35: Consommation
 *                 example:
 *               value:
 *                 type: number
 *                 description: emission du poste détaillé en g de CO2e
 *                 example: 12.3
 *         usage:
 *           description: l'emission moyenne produite par l'utilisation de l'objet en g de CO2e [disponible uniquement en mode détaillé]
 *           type: object
 *           properties:
 *             peryear:
 *               type: number
 *               description: emission produite par l'utilisation de l'objet en g de CO2e par an
 *               example: 25.3
 *             defaultyears:
 *               type: number
 *               description: duréé de vie moyenne de l'objet
 *               example: 5
 *         endOfLife:
 *           type: number
 *           description: l'emission générée (ou économisée) en fin de vie de l'objet en g de CO2e [disponible uniquement en mode détaillé]
 *           example: 45.2
 */

type APIECVV1 = {
  name: string
  ecv: number
  slug: string
  footprint?: number
  footprintDetail?: EquivalentValue[]
  usage?: { peryear: number; defaultyears: number }
  endOfLife?: number
}

/**
 * @swagger
 * /thematiques/ecv/{id}:
 *   get:
 *     tags:
 *     - ECV
 *     description: Retourne les emissions pour une thématique donnée
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         oneOf:
 *         - type: string
 *         - type: integer
 *       required: true
 *       description: ID ou Slug de la thématique demandée
 *     - in: query
 *       name: detail
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 1, retourne le détail du calcul de l'ecv. Sinon retourne uniquement le total
 *     responses:
 *       405:
 *         description: Mauvais type de requete HTTP
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Only GET queries are allowed
 *       200:
 *         description: Les emissions de chaque objet de la catégorie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *               - data
 *               properties:
 *                 warning:
 *                   type: string
 *                   example: La requete n'est pas authentifée.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ECV'
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: APIECVV1[]; warning?: string } | string | ZodError>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }
  const inputs = categoryValidation.safeParse(req.query)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const { id, detail } = inputs.data
  const hasAPIKey = await trackAPIRequest(req, 'category', id)

  const idNumber = Number.parseInt(id)
  const category = Number.isNaN(idNumber)
    ? categories.find((category) => category.slug === id)
    : categories.find((category) => category.id === idNumber)

  if (!category) {
    return res.status(404).send('Category not found.')
  }

  return res.status(200).json({
    data: equivalents
      .filter((equivalent) => equivalent.category === category.id)
      .map((equivalent) => {
        const detailedECV = detail
          ? {
              footprint: computeFootprint(equivalent),
              footprintDetail: 'ecv' in equivalent ? equivalent.ecv : undefined,
              usage: 'usage' in equivalent ? equivalent.usage : undefined,
              endOfLife: 'end' in equivalent ? equivalent.end : undefined,
            }
          : {}
        return {
          name: equivalent.name,
          slug: equivalent.slug,
          ecv: computeECV(equivalent),
          ...detailedECV,
        }
      }),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
