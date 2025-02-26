import { LivraisonType } from './Type'

export const livraisonData: Record<
  LivraisonType,
  { fabrication?: number; ecv: Record<string, { id: number; value: number }[]> }
> = {
  courses: {
    fabrication: 20,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.075,
        },
        {
          id: 33,
          value: 6.074,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.075,
        },
        {
          id: 33,
          value: 6.074,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.53,
        },
        { id: 55, value: 0.044 },
        { id: 33, value: 6.074 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.53,
        },
        { id: 55, value: 0.044 },
        { id: 33, value: 6.074 },
      ],
      clickcollect: [
        { id: 54, value: 0.53 },
        { id: 55, value: 0.075 },
        { id: 33, value: 6.074 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.53 },
        { id: 55, value: 0.075 },
        { id: 33, value: 6.074 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.53 },
        { id: 55, value: 0.039 },
        { id: 33, value: 7.419 },
      ],
    },
  },
  chaussure: {
    fabrication: 13,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.026,
        },
        {
          id: 33,
          value: 0.427,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.026,
        },
        {
          id: 33,
          value: 0.427,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.207,
        },
        { id: 55, value: 0.019 },
        { id: 33, value: 0.427 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.207,
        },
        { id: 55, value: 0.019 },
        { id: 33, value: 0.427 },
      ],
      clickcollect: [
        { id: 54, value: 0.207 },
        { id: 55, value: 0.026 },
        { id: 33, value: 0.427 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.207 },
        { id: 55, value: 0.026 },
        { id: 33, value: 0.427 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.207 },
        { id: 55, value: 0.018 },
        { id: 33, value: 0.528 },
      ],
    },
  },
  livre: {
    fabrication: 1,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.012,
        },
        {
          id: 33,
          value: 0.056,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.012,
        },
        {
          id: 33,
          value: 0.056,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.52,
        },
        { id: 55, value: 0.011 },
        { id: 33, value: 0.056 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.52,
        },
        { id: 55, value: 0.011 },
        { id: 33, value: 0.056 },
      ],
      clickcollect: [
        { id: 54, value: 0.52 },
        { id: 55, value: 0.012 },
        { id: 33, value: 0.056 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.52 },
        { id: 55, value: 0.012 },
        { id: 33, value: 0.056 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.52 },
        { id: 55, value: 0.039 },
        { id: 33, value: 0.069 },
      ],
    },
  },
  microondes: {
    fabrication: 79,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.179,
        },
        {
          id: 33,
          value: 5.566,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.179,
        },
        {
          id: 33,
          value: 5.566,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 1.829,
        },
        { id: 55, value: 0.119 },
        { id: 33, value: 5.566 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 1.829,
        },
        { id: 55, value: 0.119 },
        { id: 33, value: 5.566 },
      ],
      clickcollect: [
        { id: 54, value: 1.829 },
        { id: 55, value: 0.075 },
        { id: 33, value: 5.566 },
      ],
      clickcollectdouce: [
        { id: 54, value: 1.829 },
        { id: 55, value: 0.075 },
        { id: 33, value: 5.566 },
      ],
      livraisondomicile: [
        { id: 54, value: 1.829 },
        { id: 55, value: 0.109 },
        { id: 33, value: 6.805 },
      ],
    },
  },
  vetements: {
    fabrication: 105,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.079,
        },
        {
          id: 33,
          value: 1.151,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.079,
        },
        {
          id: 33,
          value: 1.151,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.553,
        },
        { id: 55, value: 0.046 },
        { id: 33, value: 1.151 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.553,
        },
        { id: 55, value: 0.046 },
        { id: 33, value: 1.151 },
      ],
      clickcollect: [
        { id: 54, value: 0.553 },
        { id: 55, value: 0.075 },
        { id: 33, value: 1.151 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.553 },
        { id: 55, value: 0.075 },
        { id: 33, value: 1.151 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.553 },
        { id: 55, value: 0.041 },
        { id: 33, value: 1.419 },
      ],
    },
  },
  lavelinge: {
    fabrication: 275,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.581,
        },
        {
          id: 33,
          value: 24.786,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.581,
        },
        {
          id: 33,
          value: 24.786,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 1.842,
        },
        { id: 55, value: 0.378 },
        { id: 33, value: 24.786 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 1.842,
        },
        { id: 55, value: 0.378 },
        { id: 33, value: 24.786 },
      ],
      clickcollect: [
        { id: 54, value: 1.842 },
        { id: 55, value: 0.581 },
        { id: 33, value: 24.786 },
      ],
      clickcollectdouce: [
        { id: 54, value: 1.842 },
        { id: 55, value: 0.581 },
        { id: 33, value: 24.786 },
      ],
      livraisondomicile: [
        { id: 54, value: 1.842 },
        { id: 55, value: 0.344 },
        { id: 33, value: 29.535 },
      ],
    },
  },
  lit: {
    fabrication: 421,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 3.055,
        },
        {
          id: 33,
          value: 48.539,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 3.055,
        },
        {
          id: 33,
          value: 48.539,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.53,
        },
        { id: 55, value: 1.974 },
        { id: 33, value: 48.539 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.53,
        },
        { id: 55, value: 1.974 },
        { id: 33, value: 48.539 },
      ],
      clickcollect: [
        { id: 54, value: 0.53 },
        { id: 55, value: 3.055 },
        { id: 33, value: 48.539 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.53 },
        { id: 55, value: 3.055 },
        { id: 33, value: 48.539 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.53 },
        { id: 55, value: 1.792 },
        { id: 33, value: 56.747 },
      ],
    },
  },
  smartphone: {
    fabrication: 85,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.016,
        },
        {
          id: 33,
          value: 0.142,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.016,
        },
        {
          id: 33,
          value: 0.142,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.059,
        },
        { id: 55, value: 0.015 },
        { id: 33, value: 0.142 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.059,
        },
        { id: 55, value: 0.015 },
        { id: 33, value: 0.142 },
      ],
      clickcollect: [
        { id: 54, value: 0.059 },
        { id: 55, value: 0.016 },
        { id: 33, value: 0.142 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.059 },
        { id: 55, value: 0.016 },
        { id: 33, value: 0.142 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.059 },
        { id: 55, value: 0.015 },
        { id: 33, value: 0.176 },
      ],
    },
  },
  vin: {
    fabrication: 12,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.069,
        },
        {
          id: 33,
          value: 4.921,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.069,
        },
        {
          id: 33,
          value: 4.921,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.46,
        },
        { id: 55, value: 0.045 },
        { id: 33, value: 4.921 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.46,
        },
        { id: 55, value: 0.045 },
        { id: 33, value: 4.921 },
      ],
      clickcollect: [
        { id: 54, value: 0.46 },
        { id: 55, value: 0.069 },
        { id: 33, value: 4.921 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.46 },
        { id: 55, value: 0.069 },
        { id: 33, value: 4.921 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.46 },
        { id: 55, value: 0.041 },
        { id: 33, value: 6.024 },
      ],
    },
  },
  cafetiere: {
    fabrication: 41,
    ecv: {
      magasin: [
        {
          id: 55,
          value: 0.048,
        },
        {
          id: 33,
          value: 2.183,
        },
      ],
      magasindouce: [
        {
          id: 55,
          value: 0.048,
        },
        {
          id: 33,
          value: 2.183,
        },
      ],
      pointrelais: [
        {
          id: 54,
          value: 0.374,
        },
        { id: 55, value: 0.03 },
        { id: 33, value: 2.183 },
      ],
      pointrelaisdouce: [
        {
          id: 54,
          value: 0.374,
        },
        { id: 55, value: 0.03 },
        { id: 33, value: 2.183 },
      ],
      clickcollect: [
        { id: 54, value: 0.374 },
        { id: 55, value: 0.048 },
        { id: 33, value: 2.183 },
      ],
      clickcollectdouce: [
        { id: 54, value: 0.374 },
        { id: 55, value: 0.048 },
        { id: 33, value: 2.183 },
      ],
      livraisondomicile: [
        { id: 54, value: 0.374 },
        { id: 55, value: 0.027 },
        { id: 33, value: 2.686 },
      ],
    },
  },
}
