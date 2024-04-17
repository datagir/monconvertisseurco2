export const boissons = [
  {
    id: 24283,
    name: 'Eau du robinet',
    prefix: "Litre[s] d'",
    synonyms: ['boire'],
    slug: 'eaudurobinet',
    emoji: '🚰',
    category: 3,
    total: 0.000132,
    default: true,
    tile: false,
    source: 'https://base-empreinte.ademe.fr/documentation/base-impact',
    meta: {
      title: 'Eau du robinet',
      description:
        "Connaître l'impact environnemental d'un litre d'eau du robinet, comprenant la fabrication, la distribution et la consommation",
    },
  },
  {
    id: 31000,
    Code_CIQUAL: 18430,
    name: 'Eau en bouteille',
    prefix: "Litre[s] d'",
    synonyms: ['boire'],
    slug: 'eauenbouteille',
    emoji: '💧',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.006279361839311691,
      },
      {
        id: 32,
        value: 0.16442163693709994,
      },
      {
        id: 33,
        value: 0.06062765944766532,
      },
      {
        id: 34,
        value: 0.033147419529957686,
      },
      {
        id: 35,
        value: 0.002598542165965416,
      },
    ],
    default: true,
    tile: true,
    source: 'https://agribalyse.ademe.fr/app/aliments/18430#Eau_embouteill%C3%A9e_de_source',
    meta: {
      title: 'Eau en bouteille',
      description:
        "Connaître l'impact environnemental d'un litre d'eau en bouteille, comprenant la fabrication, la distribution et la consommation",
    },
  },
  {
    id: 31001,
    Code_CIQUAL: 18026,
    name: 'Soda',
    prefix: 'Litre[s] de ',
    synonyms: ['boire'],
    slug: 'soda',
    emoji: '🥤',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.10413263417225607,
      },
      {
        id: 31,
        value: 0.01732426171634879,
      },
      {
        id: 32,
        value: 0.22981063504556218,
      },
      {
        id: 33,
        value: 0.09278663168184571,
      },
      {
        id: 34,
        value: 0.052697348606487844,
      },
      {
        id: 35,
        value: 0.014473543677499463,
      },
    ],
    default: true,
    tile: false,
    source: 'https://agribalyse.ademe.fr/app/aliments/18026#Boisson_gazeuse,_sans_jus_de_fruit,_sucr%C3%A9e',
    meta: {
      title: 'Soda',
      description:
        "Connaître l'impact écologique, calculé en kgCO₂e, d'un litre de soda, de la fabrication à la consommation",
    },
  },
  {
    id: 31002,
    Code_CIQUAL: 5001,
    name: 'Bière',
    prefix: 'Litre[s] de ',
    synonyms: ['boire'],
    slug: 'biere',
    emoji: '🍺',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.07616837712773988,
      },
      {
        id: 31,
        value: 0.28598336634616334,
      },
      {
        id: 32,
        value: 0.4592427423084754,
      },
      {
        id: 33,
        value: 0.19457960320640558,
      },
      {
        id: 34,
        value: 0.08111568200617866,
      },
      {
        id: 35,
        value: 0.022278755905036994,
      },
    ],
    default: true,
    tile: false,
    source: 'https://agribalyse.ademe.fr/app/aliments/5001#Bi%C3%A8re_%22coeur_de_march%C3%A9%22_(4-5%C2%B0_alcool)',
    meta: {
      title: 'Bière',
      description:
        "Voici le poids en kgCO₂e d'un litre de bière et comparez le à l'impact sur le climat  d'un litre d'eau en bouteille ou d'un déplacement en voiture",
    },
  },
  {
    id: 31003,
    Code_CIQUAL: 5214,
    name: 'Vin',
    prefix: 'Litre[s] de ',
    synonyms: ['boire'],
    slug: 'vin',
    emoji: '🍷',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.44669260873710237,
      },
      {
        id: 31,
        value: 0.22386911365243536,
      },
      {
        id: 32,
        value: 0.38050084514641896,
      },
      {
        id: 33,
        value: 0.09579033761903151,
      },
      {
        id: 34,
        value: 0.028107858804597485,
      },
      {
        id: 35,
        value: 0.015393454940414145,
      },
    ],
    default: true,
    tile: false,
    source: 'https://agribalyse.ademe.fr/app/aliments/5214#Vin_rouge',
    meta: {
      title: 'Vin',
      description:
        "Découvrez l'impact sur le climat d'un litre de vin, comprenant la fabrication, la distribution et la consommation",
    },
  },
  {
    id: 31004,
    Code_CIQUAL: 19051,
    name: 'Lait',
    subtitle: 'De vache',
    prefix: 'Litre[s] de ',
    synonyms: ['boire'],
    slug: 'laitdevache',
    emoji: '🥛',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.799152957419679,
      },
      {
        id: 31,
        value: 0.015443376410528314,
      },
      {
        id: 32,
        value: 0.15286265337366634,
      },
      {
        id: 33,
        value: 0.16535549763055887,
      },
      {
        id: 34,
        value: 0.049326298165567405,
      },
    ],
    default: true,
    tile: false,
    source: 'https://agribalyse.ademe.fr/app/aliments/19051#Lait_%C3%A9cr%C3%A9m%C3%A9,_pasteuris%C3%A9',
    meta: {
      title: 'Lait',
      description:
        "Découvrez le poids en kgCO₂e ou CO₂e d'un litre de lait de vache par rapport au lait de soja et ainsi son impact écologique",
    },
  },
  {
    name: 'Lait',
    Code_CIQUAL: 18900,
    subtitle: 'De soja',
    prefix: 'Litre[s] de ',
    synonyms: ['boire'],
    slug: 'laitdesoja',
    emoji: '🍈',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.13061776408521542,
      },
      {
        id: 31,
        value: 0.06453821103848224,
      },
      {
        id: 32,
        value: 0.10069163573007084,
      },
      {
        id: 33,
        value: 0.10676070898306896,
      },
      {
        id: 34,
        value: 0.0430412391631626,
      },
    ],
    total: 0.42,
    default: false,
    tile: false,
    source: 'https://agribalyse.ademe.fr/app/aliments/18900#Boisson_au_soja,_nature',
    meta: {
      title: 'Lait',
      description:
        "Découvrez le poids en kgCO₂e ou CO₂e d'un litre de lait de vache par rapport au lait de soja et ainsi son impact écologique",
    },
  },
  {
    name: 'Thé',
    Code_CIQUAL: 18020,
    prefix: 'Litre[s] de ',
    slug: 'thé',
    emoji: '🫖',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.02452355378915698,
      },
      {
        id: 32,
        value: 0.0006555673797149556,
      },
      {
        id: 33,
        value: 0.0006900499206393254,
      },
      {
        id: 34,
        value: 0.00013555602943513944,
      },
      {
        id: 35,
        value: 0.0131566263810536,
      },
    ],
    default: true,
    tile: false,
    meta: {
      title: '',
      description: '',
    },
    source: 'https://agribalyse.ademe.fr/app/aliments/18020#Th%C3%A9_infus%C3%A9,_non_sucr%C3%A9',
    hypothesis: 'Nous prenons pour hypothèse une tasse de 250ml  (simplifié ici en 250mg).',
  },
  {
    name: 'Café',
    Code_CIQUAL: 18004,
    prefix: 'Litre[s] de ',
    slug: 'cafe',
    emoji: '☕️',
    category: 3,
    ecv: [
      {
        id: 30,
        value: 0.5360726648026617,
      },
      {
        id: 31,
        value: 0.020654948604764477,
      },
      {
        id: 32,
        value: 0.003083304397760912,
      },
      {
        id: 33,
        value: 0.009655399325691972,
      },
      {
        id: 34,
        value: 0.0013928452705040861,
      },
      {
        id: 35,
        value: 0.023365480858616866,
      },
    ],
    default: true,
    tile: false,
    meta: {
      title: 'Café',
      description: '',
    },
    source:
      'https://agribalyse.ademe.fr/app/aliments/18004#Caf%C3%A9,_non_instantan%C3%A9,_non_sucr%C3%A9,_pr%C3%AAt_%C3%A0_boire',
    hypothesis: 'Nous prenons pour hypothèse une tasse de 250ml (simplifié ici en 250mg).',
  },
]
