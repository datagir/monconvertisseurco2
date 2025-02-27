import { Suspense } from 'react'
import Link from 'components/base/buttons/Link'
import ToolCard from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import { quiz, tools } from 'components/cards/tools'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import Email from './Email'
import Equivalents from './Equivalents'
import styles from './Home.module.css'
import MiniCard from './MiniCard'

const Home = () => {
  return (
    <>
      <Block>
        <h1 className={styles.title}>Les bons outils pour communiquer sur l’impact carbone</h1>
        <ToolCards
          tools={[
            tools.find((tool) => tool.slug === 'livraison'),
            tools.find((tool) => tool.slug === 'alimentation'),
            quiz,
          ]}
        />
        <div className={styles.link}>
          <Link href='/outils'>Voir tous les outils</Link>
        </div>
      </Block>
      <Block title='Le bon format' description='Pour votre prochain article ou post, votre site ou appli.'>
        <ul className={styles.miniCards}>
          <MiniCard image='/images/home-iframe.svg' title='Un widget' description='dans votre article' />
          <MiniCard image='/images/home-image.svg' title='Une image' description='dans votre post' />
          <MiniCard image='/images/home-link.svg' title='Un lien' description='sur votre site web' />
          <MiniCard image='/images/home-api.svg' title='Une API' description='pour votre appli' />
        </ul>
      </Block>
      <Block
        title='L’accompagnement sur mesure'
        description='L’équipe vous aide à intégrer les outils adaptés à vos besoins, gratuitement.'>
        <Email />
      </Block>
      <Block
        title='Les fiches'
        description='Parcourir les fiches dédiées à l’impact carbone de plus de 150 objets et gestes courants.'>
        <Equivalents />
      </Block>
      <Suspense>
        <Examples title='Exemples' description='Ils utilisent nos outils à la perfection.' filter="Page d'accueil" />
      </Suspense>
      <Suspense>
        <FAQs filter='Accueil' page='Accueil' />
      </Suspense>
      <Block
        title='À découvrir'
        description="Vous souhaitez mobiliser votre communauté autour de l'empreinte carbone ?">
        <ul>
          <ToolCard
            horizontal
            slug='ngc'
            image='/images/ngc.png'
            title='Nos Gestes Climat'
            description='Calculez votre empreinte carbone citoyenne et faites le bilan en équipe'
            linkLabel='Visitez le site'
            link='https://nosgestesclimat.fr/'
          />
        </ul>
      </Block>
    </>
  )
}

export default Home
