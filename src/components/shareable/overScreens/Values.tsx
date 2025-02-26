import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Resource from 'components/base/Resource'
import ComparisonOverscreen from 'components/comparateur/overscreens/ComparisonOverscreen'
import EquivalentsOverscreen from 'components/comparateur/overscreens/EquivalentsOverscreen'
import AlimentationIntegrate from './AlimentationIntegrate'
import AlimentationData from './Data/AlimentationData'
import Integrate from './Integrate'
import LivraisonIntegrate from './LivraisonIntegrate'
import Share from './Share'
import TransportIntegrate from './TransportIntegrate'
import TransportShare from './TransportShare'
import styles from './Values.module.css'

const ChauffageData = dynamic(() => import('./Data/ChauffageData'))
const FruitsEtLegumesData = dynamic(() => import('./Data/FruitsEtLegumesData'))
const LivraisonData = dynamic(() => import('./Data/LivraisonData'))
const UsageData = dynamic(() => import('./Data/UsageData'))
const OsezChangerData = dynamic(() => import('./Data/OsezChangerData'))
const TransportData = dynamic(() => import('./Data/TransportData'))
const UsageNumeriqueData = dynamic(() => import('./Data/UsageNumeriqueData'))

export type OverScreenInfo = {
  title: string
  hideTitle?: boolean
  image?: string
  children: ReactNode
  fullHeight?: boolean
  cancel?: (onClose: () => void) => ReactNode
}

export const overScreenEquivalentEtiquetteValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => {
  const params = `value=${equivalent.value}&comparisons=${equivalent.slug}`

  return {
    integrer: {
      title: 'integrate',
      children: <Integrate path='/comparateur/etiquette' extraParams={params} tracking={getName('fr', equivalent)} />,
    },
  }
}
export const overScreenQuizValues: () => Record<string, OverScreenInfo> = () => {
  return {
    partager: {
      title: 'share',
      children: <Share path='/outils/quiz' tracking='Quiz' />,
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='quiz' tracking='Quiz' />,
    },
  }
}

export const overScreenEquivalentInfographyValues: (
  equivalent: ComputedEquivalent,
  equivalents: string[]
) => Record<string, OverScreenInfo> = (equivalent, equivalents) => ({
  partager: {
    title: 'share',
    children: (
      <Share path={equivalent.link} tracking={`${getName('fr', equivalent)} infographie`} anchor='infographie' />
    ),
  },
  integrer: {
    title: 'integrate',
    children: (
      <Integrate
        path='/infographie'
        extraParams={`equivalents=${equivalents.join(',')}`}
        tracking={`${getName('fr', equivalent)} infographie`}
      />
    ),
  },
})
export const overScreenEquivalentImageInfographyValues: (
  equivalent: ComputedEquivalent,
  index: number
) => Record<string, OverScreenInfo> = (equivalent, index) => ({
  partager: {
    title: 'share',
    children: (
      <Share
        noLanguage
        anchor={`image-infographie-${index}`}
        path={equivalent.link}
        tracking={`${getName('fr', equivalent)} image infographie ${index}`}
      />
    ),
  },
})

export const overScreenEquivalentValues: (equivalent: ComputedEquivalent) => Record<string, OverScreenInfo> = (
  equivalent
) => ({
  partager: {
    title: 'share',
    children: <Share path={equivalent.link} tracking={getName('fr', equivalent)} />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path={equivalent.link.replace('/outils/', '')} tracking={getName('fr', equivalent)} />,
  },
  usage: {
    title: 'usage',
    children: <UsageData />,
  },
})

export const overScreenComparateurValues = {
  partager: {
    title: 'share',
    children: <Share path='outils/comparateur' tracking='Comparateur' />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='comparateur' tracking='Comparateur' />,
  },
  equivalents: {
    title: 'equivalent',
    hideTitle: true,
    children: <EquivalentsOverscreen />,
    fullHeight: true,
  },
}

export const overScreenLivraisonEtiquettesValues: () => Record<
  'animated' | 'static',
  Record<string, OverScreenInfo>
> = () => ({
  animated: {
    integrer: {
      title: 'integrate',
      children: <Integrate path='livraison/etiquette-animee' tracking='Livraison' />,
    },
  },
  static: {
    integrer: {
      title: 'integrate',
      children: <Integrate path='livraison/etiquette' tracking='Livraison' />,
    },
  },
})

export const overScreenComparateurEtiquettesValues: () => Record<
  'animated' | 'static',
  Record<string, OverScreenInfo>
> = () => ({
  animated: {
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette-animee' tracking='Comparateur' />,
    },
  },
  static: {
    integrer: {
      title: 'integrate',
      children: <Integrate path='comparateur/etiquette' tracking='Comparateur' />,
    },
  },
})

export const overScreenOsezChangerValues: () => Record<string, OverScreenInfo> = () => {
  return {
    partager: {
      title: 'share',
      children: (
        <Share
          category={{
            slug: 'osez-changer',
            name: 'Défi chaussures',
          }}
          path='outils/habillement/osez-changer'
          tracking='OsezChanger'
        />
      ),
    },
    integrer: {
      title: 'integrate',
      children: <Integrate path='habillement/osez-changer' tracking='OsezChanger' />,
    },
    hypothesis: {
      image: '/images/icn-next-actions.svg',
      title: 'next-actions',
      children: (
        <div className={styles.ressourceContainer}>
          <Resource
            image='/images/osez-changer-fast-fashion.png'
            text='fast-fashion'
            href='https://librairie.ademe.fr/consommer-autrement/7747-tout-comprendre-les-impacts-de-la-mode-et-de-la-fast-fashion.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-tri.png'
            text='tri'
            href='https://librairie.ademe.fr/consommer-autrement/5271-comment-faire-de-la-place-chez-soi-.html'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-questions.png'
            text='questions'
            href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
            tracking='OsezChanger'
          />
          <Resource
            image='/images/osez-changer-deuxieme-vie.png'
            text='deuxieme-vie'
            href='https://longuevieauxobjets.ademe.fr/'
            tracking='OsezChanger'
          />
        </div>
      ),
    },
    data: {
      image: '/images/icn-understand.svg',
      title: 'understand',
      children: <OsezChangerData />,
    },
  }
}

export const overScreenQuizInfographyValues = {
  partager: {
    title: 'share',
    children: <Share tracking='Quiz infographie' path='iframes/quiz-infographie' />,
  },
  integrer: {
    title: 'integrate',
    children: <Integrate path='quiz-infographie' tracking='Quiz infographie' />,
  },
}

export const overScreenCategoryValues: (category: Category) => Record<string, OverScreenInfo> = (category) => {
  const values = {
    partager: {
      title: 'share',
      children:
        category.slug === 'transport' ? <TransportShare /> : <Share category={category} tracking={category.name} />,
    },
    integrer: {
      title: 'integrate',
      children: (
        <Integrate
          category={category}
          path={category ? category.slug : 'comparateur'}
          tracking={category ? category.name : 'Comparateur'}
        />
      ),
    },
  }
  if (category.slug === 'chauffage') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/category-pompe-chaleur.jpg'
              text='pompe-chaleur'
              href='https://librairie.ademe.fr/changement-climatique-et-energie/6714-s-equiper-d-une-pompe-a-chaleur.html'
              withLink='ADEME'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/category-chauffage-bois.jpg'
              text='chauffage-bois'
              href='https://librairie.ademe.fr/urbanisme-et-batiment/5667-adopter-le-chauffage-au-bois-9791029719769.html'
              withLink='ADEME'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/category-wattris.png'
              text='wattris'
              href='https://wattris.ademe.fr/'
              withLink='Wattris'
              tracking={category ? category.name : 'Comparateur'}
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking={category ? category.name : 'Comparateur'}
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <ChauffageData />,
      },
    }
  }
  if (category.slug === 'teletravail') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ecoresponsable.png'
              text='ecoresponsable'
              href='https://librairie.ademe.fr/consommer-autrement/5225-ecoresponsable-au-bureau-9791029718960.html'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/leger.png'
              text='leger'
              href='https://librairie.ademe.fr/consommer-autrement/249-comment-teletravailler-leger-.html'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/agir.png'
              text='agir-tt'
              href='https://agirpourlatransition.ademe.fr/particuliers/maison/teletravail-ca-change-quoi-planete'
              withLink='ADEME'
              tracking='Télétravail'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Télétravail'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
    }
  }
  if (category.slug === 'fruitsetlegumes') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/category-fruitsetlegumes.png'
              text='calendar'
              href='https://librairie.ademe.fr/consommer-autrement/5784-a-chaque-mois-ses-fruits-et-legumes-.html'
              withLink='ADEME'
              tracking='fruitsetlegumes'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='fruitsetlegumes'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <FruitsEtLegumesData />,
      },
    }
  }
  if (category.slug === 'transport') {
    return {
      ...values,
      integrer: {
        title: 'integrate',
        children: <TransportIntegrate />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Transport'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <TransportData />,
      },
      comparison0: {
        title: 'comparison',
        hideTitle: true,
        children: <ComparisonOverscreen index={0} />,
        fullHeight: true,
      },
      comparison1: {
        title: 'comparison',
        hideTitle: true,
        children: <ComparisonOverscreen index={1} />,
        fullHeight: true,
      },
    }
  }
  if (category.slug === 'usagenumerique') {
    return {
      ...values,
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Usage numérique'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <UsageNumeriqueData />,
      },
    }
  }
  if (category.slug === 'livraison') {
    return {
      integrer: {
        title: 'integrate',
        children: <LivraisonIntegrate />,
      },
      partager: {
        title: 'share',
        children: <Share category={category} tracking={category.name} extraKit='livraison' />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/category-livraison.png'
              text='livraison'
              href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'
              withLink='ADEME'
              tracking='Livraison'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Livraison'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <LivraisonData />,
      },
    }
  }
  if (category.slug === 'alimentation') {
    return {
      ...values,
      integrer: {
        title: 'integrate',
        children: <AlimentationIntegrate />,
      },
      hypothesis: {
        image: '/images/icn-next-actions.svg',
        title: 'next-actions',
        children: (
          <div className={styles.ressourceContainer}>
            <Resource
              image='/images/agir-alimentation.png'
              text='agir-alimentation'
              href='https://librairie.ademe.fr/agriculture-alimentation-foret-bioeconomie/7617-tout-comprendre-une-alimentation-plus-durable.html'
              withLink='ADEME'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-fruitsetlegumes.svg'
              text='ico2-fruitsetlegumes'
              href='https://impactco2.fr/outils/fruitsetlegumes'
              withLink='Fruits et légumes de saison'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-repas.svg'
              text='ico2-repas'
              href='https://impactco2.fr/outils/alimentation#repas'
              withLink='Repas'
              tracking='Alimentation'
            />
            <Resource
              image='/images/tools-alimentation.png'
              text='ico2-fiches-alimentation'
              href='https://impactco2.fr/kit/fiches-alimentation.zip'
              withLink='Télécharger les 66 fiches'
              tracking='Alimentation'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Alimentation'
              imgSize='4.5rem'
            />
          </div>
        ),
      },
      data: {
        image: '/images/icn-understand.svg',
        title: 'understand',
        children: <AlimentationData />,
      },
    }
  }
  return values
}
