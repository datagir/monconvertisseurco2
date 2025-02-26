import classNames from 'classnames'
import { categories } from 'data/categories'
import { getName } from 'utils/Equivalent/equivalent'
import Link from 'components/base/buttons/Link'
import { devTools, smallTools } from 'components/cards/tools'
import pageStyles from './Page.module.css'
import styles from './PlanDuSitePage.module.css'

const tools = [
  ...devTools.map((tool) => ({ slug: tool.slug, name: tool.title, equivalents: null })),
  ...smallTools.map((tool) => ({ slug: tool.slug, name: tool.title, equivalents: null })),
  ...categories.map((category) => ({ slug: category.slug, name: category.name, equivalents: category.equivalents })),
]

const PlanDuSitePage = () => {
  return (
    <div className={classNames(pageStyles.container, 'main-container')}>
      <h1>Plan du site</h1>
      <ul className={styles.links}>
        <li>
          <Link prefetch={false} href='/'>
            Page d'accueil
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/accessibilite'>
            Accessibilité
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/budget'>
            Budget
          </Link>
        </li>
        <p>Contenus</p>
        <ul className={styles.row}>
          <li>
            <Link prefetch={false} href='/contenu/comment-sensibiliser-vos-visiteurs-empreinte-carbone'>
              Comment sensibiliser vos visiteurs à l’empreinte carbone ?
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/detecteur-co2'>
              Le Détecteur CO₂
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/etiquette-carbone'>
              L’étiquette carbone : présentation et tutoriel d’intégration
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/impact-carbone-hiver-station-ski'>
              4 conseils pour réduire l’impact carbone des séjours au ski
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/nouveau-site'>
              Le nouveau site “Impact CO2” est en ligne !
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/quiz-carbone'>
              Quiz carbone : le nouveau jeu de cartes de l’ADEME est en ligne !
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/contenu/semaine-mobilite-simulateur-transport-ademe'>
              Semaine européenne de la mobilité : découverte du calculateur Impact Transport de l’ADEME
            </Link>
          </li>
        </ul>
        <li>
          <Link prefetch={false} href='/doc'>
            La doc
          </Link>
        </li>
        <ul className={styles.row}>
          <li>
            <Link prefetch={false} href='/doc/api'>
              API Doc
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/doc/guide-utilisation'>
              Guide d'utilisation
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/doc/questions-frequentes'>
              Questions fréquentes
            </Link>
          </li>
          <li>
            <Link prefetch={false} href='/doc/usage-numerique/acv'>
              Usage numérique
            </Link>
          </li>
        </ul>
        <li>
          <Link prefetch={false} href='/eco-conception'>
            Éco-conception
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/mentions-legales'>
            Mentions légales
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/outils'>
            Les outils
          </Link>
        </li>
        <ul className={styles.row}>
          {tools.map((tool) => (
            <ul className={styles.row} key={tool.slug}>
              <li>
                <Link prefetch={false} href={`/outils/${tool.slug}`}>
                  {tool.name}
                </Link>
              </li>
              {tool.equivalents && (
                <ul className={styles.row}>
                  {tool.equivalents.map((equivalent) => (
                    <li key={equivalent.slug}>
                      <Link prefetch={false} href={equivalent.link}>
                        {getName('fr', equivalent)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          ))}
          <li>
            <Link prefetch={false} href='/outils/comparateur'>
              Comparateur
            </Link>
          </li>
        </ul>
        <li>
          <Link prefetch={false} href='/plan-du-site'>
            Plan du site
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/politique-de-confidentialite'>
            Politique de confidentialité
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/rendez-vous'>
            Prendre rendez-vous
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/stats'>
            Statistiques
          </Link>
        </li>
        <li>
          <Link prefetch={false} href='/suggestion'>
            Faire une suggestion
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default PlanDuSitePage
