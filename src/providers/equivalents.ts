import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { alimentation } from 'data/categories/alimentation'
import { boissons } from 'data/categories/boisson'
import { casPratiques } from 'data/categories/caspratiques'
import { chauffage } from 'data/categories/chauffage'
import { deplacements } from 'data/categories/deplacement'
import { electromenager } from 'data/categories/electromenager'
import { flattenEquivalents } from 'data/categories/flattenEquivalents'
import { fruitsEtLegumes } from 'data/categories/fruitsetlegumes'
import { habillements } from 'data/categories/habillement'
import { livraison } from 'data/categories/livraison'
import { mobiliers } from 'data/categories/mobilier'
import { numeriques } from 'data/categories/numerique'
import { repas } from 'data/categories/repas'
import { usageNumeriques } from 'data/categories/usagenumerique'
import { computeECV } from 'utils/computeECV'

export const computedEquivalents = [
  ...boissons,
  ...flattenEquivalents(deplacements),
  ...electromenager,
  ...habillements,
  ...mobiliers,
  ...numeriques,
  ...usageNumeriques,
  ...alimentation,
  ...repas,
  ...chauffage,
  ...fruitsEtLegumes,
  ...casPratiques,
  ...livraison,
].map((equivalent) => ({
  ...equivalent,
  link: `/outils/${categories.find((category) => category.id === equivalent.category)?.slug}/${equivalent.slug}`,
  value: computeECV(equivalent),
})) as ComputedEquivalent[]
