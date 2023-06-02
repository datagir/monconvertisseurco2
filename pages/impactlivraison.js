import categories from 'data/categories.json'

import Section2 from 'components/base/Section2'

import EntreesLivraison from './impactlivraison/EntreesLivraison'
import IntroLivraison from './impactlivraison/IntroLivraison'

export default function Impactlivraison() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <IntroLivraison />
        <EntreesLivraison />
      </Section2.InnerMargin>
    </Section2>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === 'livraison'),
    },
  }
}
