import CheckIcon from 'components/base/icons/check'
import SimpleStarShapeIcon from 'components/base/icons/simple-star-shape'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import News from 'components/cards/News'
import { ToolCardProps } from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import { devTools, quiz, smallTools, tools } from 'components/cards/tools'
import FAQs from 'components/faq/FAQs'
import Equivalents from 'components/home/Equivalents'
import Block from 'components/layout/Block'
import styles from './Outils.module.css'

const Outils = () => {
  return (
    <>
      <Breadcrumbs current='Les outils' links={[{ label: 'Accueil', link: '/' }]} />
      <Block title='Les outils' as='h1' description='Trouver l’outil adapté à votre prochaine publication.' />
      <News
        tools={[
          {
            ...quiz,
            title: 'Découvrez le quiz carbone',
            linkLabel: 'Faire le quiz',
            description: (
              <>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>10 questions pour tester ses connaissances</p>
                </div>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>Un nouveau format interactif pour apprendre et sensibiliser</p>
                </div>
              </>
            ),
          },
          {
            ...(tools.find((tool) => tool.slug === 'alimentation') as ToolCardProps),
            title: 'Comparez l’impact carbone des aliments !',
            linkLabel: 'Découvrir',
            description: (
              <>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>60 aliments à comparer entre eux</p>
                </div>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>Un classement d'impact par rayon du magasin, popularité...</p>
                </div>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>Un outil facile à intergrer dans un contenu de sensibilisation</p>
                </div>
              </>
            ),
          },
          {
            ...(tools.find((tool) => tool.slug === 'livraison') as ToolCardProps),
            title: 'Découvrez le nouvel Impact Livraison !',
            linkLabel: 'Découvrir',
            description: (
              <>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>Comparer les modes de livraison avec l’achat en magasin</p>
                </div>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckIcon />
                    </div>
                  </div>
                  <p>Un nouveau format étiquette encore plus facile à intégrer</p>
                </div>
              </>
            ),
          },
        ]}
      />
      <Block
        title='Outils thématiques'
        description='Notre collection de simulateurs, comparateurs et infographies thématiques.'>
        <ToolCards tools={tools} />
      </Block>
      <Block
        title='Petits formats'
        description='Nos widgets, modules et autres formats miniatures à intégrer à vos contenus.'>
        <ToolCards
          tools={[
            quiz,
            ...smallTools,
            {
              slug: 'osez-changer',
              title: 'Défi chaussures',
              description: 'Compter vos chaussures et évaluer l’impact carbone de vos derniers achats',
              linkLabel: 'Découvrir',
              link: '/outils/habillement#osez-changer',
            },
          ]}
        />
      </Block>
      <Block title='Pour les développeurs' description='Des outils spécifiques pour des usages avancés.'>
        <ToolCards tools={devTools} />
      </Block>
      <Block
        title='Les fiches'
        description='Parcourir les fiches dédiées à l’impact carbone de plus de 150 objets et gestes courants.'>
        <Equivalents />
      </Block>
      <FAQs filter='Catalogue outils' page='Outils' />
    </>
  )
}

export default Outils
