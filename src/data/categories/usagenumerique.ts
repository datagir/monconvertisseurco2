export const usageNumeriques = [
  {
    slug: 'email',
    unit: 'param',
    category: 10,
    ecv: [
      {
        value: 0.001286218,
        id: 13,
      },
      {
        value: 0.00008684837,
        id: 14,
      },
      {
        value: 0.00003580927,
        id: 15,
      },
      {
        value: 0.00093525547,
        id: 16,
      },
      {
        value: 0.00011768151,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
  },
  {
    slug: 'spam',
    unit: 'email',
    category: 10,
    ecv: [
      {
        value: 0.0026857,
        id: 15,
      },
      {
        value: 0.00093525547,
        id: 16,
      },
      {
        value: 0.00011768151,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
    include: {
      pre: 'Non lu',
    },
  },
  {
    slug: 'stockagedonnee',
    unit: 'année',
    category: 10,
    ecv: [
      {
        value: 0.00012454537,
        id: 16,
      },
      {
        value: 0.0001107888,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
    include: {
      pre: 'Pendant 1 an.',
    },
  },
  {
    slug: 'rechercheweb',
    unit: 'recherche',
    category: 10,
    ecv: [
      {
        value: 0.0007446526,
        id: 13,
      },
      {
        value: 0.0502806333,
        id: 14,
      },
      {
        value: 0.00000141881,
        id: 15,
      },
      {
        value: 0.000000020842307,
        id: 16,
      },
      {
        value: 0.0000155441,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
  },
  {
    slug: 'streamingvideo',
    category: 10,
    ecv: [
      {
        value: 0.0327361035,
        id: 13,
      },
      {
        value: 0.002903607,
        id: 14,
      },
      {
        value: 0.02780804,
        id: 15,
      },
      {
        value: 0.000236636,
        id: 16,
      },
      {
        value: 0.00033236641,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
    unit: 'avec les paramètres renseignés ci-dessous.',
  },
  {
    slug: 'visioconference',
    category: 10,
    ecv: [
      {
        value: 0.04100456621,
        id: 13,
      },
      {
        value: 0.002845,
        id: 14,
      },
      {
        value: 0.0129770857,
        id: 15,
      },
      {
        value: 0.000236636,
        id: 16,
      },
      {
        value: 7.755216e-8,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
    unit: 'avec les paramètres renseignés ci-dessous.',
  },
  {
    slug: 'telechargement',
    category: 10,
    ecv: [
      {
        value: 0.0092693467,
        id: 15,
      },
      {
        value: 0.00012454537,
        id: 16,
      },
      {
        value: 0.0001107888,
        id: 17,
      },
    ],
    source: 'https://negaoctet.org/',
  },
]
