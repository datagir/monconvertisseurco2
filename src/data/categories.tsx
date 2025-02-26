import { Category } from 'types/category'
import { alimentation } from './categories/alimentation'
import { boissons } from './categories/boisson'
import { casPratiques } from './categories/caspratiques'
import { chauffage } from './categories/chauffage'
import { computedEquivalents } from './categories/computedEquivalents'
import { deplacements } from './categories/deplacement'
import { electromenager } from './categories/electromenager'
import { flattenEquivalents } from './categories/flattenEquivalents'
import { fruitsEtLegumes } from './categories/fruitsetlegumes'
import { habillements } from './categories/habillement'
import { livraison } from './categories/livraison'
import { mobiliers } from './categories/mobilier'
import { numeriques } from './categories/numerique'
import { repas } from './categories/repas'
import { usageNumeriques } from './categories/usagenumerique'

export const categories: Category[] = [
  {
    id: 13,
    name: 'Cas pratiques',
    slug: 'caspratiques',
    description: "Comparez l'empreinte carbone d'un aller retour Paris New york, ou de votre soirée netflix",
    equivalents: computedEquivalents('caspratiques', casPratiques),
    unit: '',
  },
  {
    id: 10,
    name: 'Usage numérique',
    tool: 'Impact Usage Numérique',
    slug: 'usagenumerique',
    sources: [
      {
        label: 'Étude NégaOctet - 2022',
        href: 'https://base-empreinte.ademe.fr/documentation/base-impact?state=aWZCflVtbFNGbzBuREZJYVF5SmNVQUhtQThOQlhQQjBYcnRtZFVUWm96XzBl&session_state=7a05d0ef-f903-4d12-8c46-6d0b8301d7c5&code=b72ffd5d-c06a-4c52-bd55-e553b8ca6eb4.7a05d0ef-f903-4d12-8c46-6d0b8301d7c5.e8e7e1ec-ca0a-42ac-bf39-2abdf82b7fb2',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Évaluer l’impact carbone de vos usages numériques',
    unit: 'unité',
    equivalents: computedEquivalents('usagenumerique', usageNumeriques),
  },
  {
    id: 12,
    name: 'Livraison',
    tool: 'Impact Livraison',
    slug: 'livraison',
    description: "Comparer l'impact carbone des modes d'achat",
    unit: '',
    sources: [
      {
        label: 'Commerce en ligne - Étude ADEME 2023',
        href: 'https://librairie.ademe.fr/mobilite-et-transport/6261-commerce-en-ligne-impacts-environnementaux-de-la-logistique-des-transports-et-des-deplacements.html',
      },
    ],
    equivalents: computedEquivalents('livraison', livraison),
  },
  {
    id: 8,
    name: 'Chauffage',
    tool: 'Impact Chauffage',
    slug: 'chauffage',
    sources: [
      {
        label: 'Étude : Consommation d’énergie par…',
        href: 'https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Situer l’empreinte carbone des différents modes de chauffage',
    unit: 'm²',
    equivalents: computedEquivalents('chauffage', chauffage),
    examples: 'Leur utilisation du simulateur chauffage est exemplaire.',
  },
  {
    id: 4,
    name: 'Transport',
    tool: 'Impact Transport',
    slug: 'transport',
    synonyms: ['transport', 'déplacement', 'déplacer', 'voyager'],
    description: 'Calculer l’impact carbone des moyens de transport',
    sources: [
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    unit: 'km',
    equivalents: computedEquivalents('transport', flattenEquivalents(deplacements)),
    examples: 'Leur utilisation du simulateur transports est exemplaire.',
  },
  {
    id: 9,
    name: 'Fruits et légumes',
    tool: 'Fruits et légumes de saison',
    slug: 'fruitsetlegumes',
    synonyms: ['manger', 'fruit', 'legume'],
    description: 'Découvrir les fruits et légumes de la saison et leur impact carbone',
    unit: 'kg',
    equivalents: computedEquivalents('fruitsetlegumes', fruitsEtLegumes),
    sources: [
      {
        label: 'Agribalyse 3.2 - Mise à jour le 15/01/2025',
        href: 'https://agribalyse.ademe.fr/app',
      },
    ],
  },
  {
    id: 1,
    name: 'Numérique',
    tool: 'Impact Numérique',
    slug: 'numerique',
    sources: [
      {
        label: 'Etude ADEME / ARCEP - 2022',
        href: 'https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Mesurer l’impact carbone des appareils numériques',
    unit: 'unité',
    equivalents: computedEquivalents('numerique', numeriques),
    more: 'appareils',
  },
  {
    id: 2,
    name: 'Alimentation',
    tool: 'Impact Alimentation',
    slug: 'alimentation',
    synonyms: ['manger', 'alimenter'],
    sources: [
      {
        label: 'Agribalyse 3.2 - Mise à jour le 15/01/2025',
        href: 'https://agribalyse.ademe.fr/app',
      },
    ],
    description: 'Communiquer sur l’impact carbone de l’alimentation',
    unit: 'kg',
    equivalents: [...computedEquivalents('alimentation', alimentation), ...computedEquivalents('alimentation', repas)],
  },
  {
    id: 5,
    name: 'Habillement',
    tool: 'Impact Habillement',
    slug: 'habillement',
    synonyms: ['habiller'],
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/1189-modelisation-et-evaluation-des-impacts-environnementaux-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Comparer l’impact carbone des vêtements entre eux',
    unit: 'unité',
    more: 'vetement',
    equivalents: computedEquivalents('habillement', habillements),
  },
  {
    id: 7,
    name: 'Mobilier',
    tool: 'Impact Mobilier',
    slug: 'mobilier',
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/1189-modelisation-et-evaluation-des-impacts-environnementaux-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Découvrir l’impact carbone des meubles',
    unit: 'unité',
    equivalents: computedEquivalents('mobilier', mobiliers),
  },
  {
    id: 6,
    name: 'Électroménager',
    tool: 'Impact Électroménager',
    slug: 'electromenager',
    sources: [
      {
        label: 'Rapport : Modélisation et évaluation...',
        href: 'https://librairie.ademe.fr/consommer-autrement/1189-modelisation-et-evaluation-des-impacts-environnementaux-de-produits-de-consommation-et-biens-d-equipement.html',
      },
      {
        label: 'Base Empreinte ADEME',
        href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
      },
    ],
    description: 'Comparer l’impact carbone des appareils ménagers',
    unit: 'unité',
    equivalents: computedEquivalents('electromenager', electromenager),
  },
  {
    id: 3,
    name: 'Boisson',
    tool: 'Impact Boisson',
    slug: 'boisson',
    description: 'Comparer l’impact carbone des boissons',
    synonyms: ['boire'],
    unit: 'litre',
    sources: [
      {
        label: 'Agribalyse 3.2 - Mise à jour le 15/01/2025',
        href: 'https://agribalyse.ademe.fr/app',
      },
    ],
    equivalents: computedEquivalents('boisson', boissons),
  },
]
