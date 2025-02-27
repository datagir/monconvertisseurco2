import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'
import styles from 'components/outils/CategoryPage.module.css'
import LivraisonCards from 'components/outils/livraison/LivraisonCards'
import LivraisonEtiquettes from 'components/outils/livraison/LivraisonEtiquettes'
import { simulators } from 'components/outils/simulators'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import Suggestion from 'components/layout/Suggestion'

const livraison = categories.find((category) => category.slug === 'livraison') as CategoryType

const LivraisonPage = () => {
  return (
    <>
      <Breadcrumbs
        current={livraison.name}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={livraison.name} as='h1' description={livraison.description}>
        <LivraisonCards />
      </Block>
      <Block
        id='simulateur'
        title='Simulateur'
        description='Un format complet à intégrer dans vos contenus sur le thème de la livraison'>
        <Category category={livraison} simulator={simulators['livraison']} />
        {livraison.sources && (
          <Sources className={styles.sources} sources={livraison.sources} tracking={livraison.name} />
        )}
      </Block>
      <Block
        id='etiquettes'
        title='Étiquettes'
        description='Un plus petit format, facile à intégrer dans un parcours d’achat'>
        <LivraisonEtiquettes />
      </Block>
      <Suspense>
        <Examples
          title='Exemples'
          description={livraison.examples || 'Ils utilisent nos outils à la perfection.'}
          filter={livraison.name}
          tool={livraison.tool}
        />
        <Suspense />
        <FAQs filter={livraison.name} page={livraison.name} />
      </Suspense>
      <Suggestion from='/outils/livraison' fromLabel='Livraison' simulatorName='de la thématique Livraison' />
    </>
  )
}

export default LivraisonPage
