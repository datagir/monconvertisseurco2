import Image from 'next/image'
import { useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenLivraisonEtiquettesValues } from 'components/shareable/overScreens/Values'
import LivraisonEtiquette from './LivraisonEtiquette'
import styles from './LivraisonEtiquettes.module.css'

const LivraisonEtiquettes = () => {
  const overScreens = useMemo(() => overScreenLivraisonEtiquettesValues(), [])

  return (
    <div className={styles.etiquettes}>
      <Shareable
        slug='etiquette-statique'
        tracking='Étiquette statique'
        overScreens={overScreens.static}
        secondary={
          <div className={styles.secondary}>
            <h3 className={styles.secondaryTitle}>Étiquette livraison statique</h3>
            <div className={styles.secondarySeparator} />
            <div className={styles.secondaryInfo}>
              <div className={styles.icon}>
                <Image src='/images/icn-next-actions-gray.svg' width={24} height={24} alt='' />
              </div>
              <p>
                L’étiquette livraison offre une comparaison rapide des ordres de grandeur des scénarios d’achat, basée
                sur un colis moyen et des distances moyennes.
              </p>
            </div>
          </div>
        }
        withoutShare>
        <LivraisonEtiquette id='static' />
      </Shareable>
      <div className={styles.separator} />
      <Shareable
        slug='etiquette-animee'
        tracking='Étiquette animée'
        overScreens={overScreens.animated}
        secondary={
          <div className={styles.secondary}>
            <h3 className={styles.secondaryTitle}>Étiquette livraison animée</h3>
            <div className={styles.secondarySeparator} />
            <div className={styles.secondaryInfo}>
              <div className={styles.icon}>
                <Image src='/images/icn-next-actions-gray.svg' width={24} height={24} alt='' />
              </div>
              <p>
                L’étiquette animée présente les mêmes contenus que l’étiquette standard, dans un format plus compact où
                chaque scénario défile toutes les 4 secondes.
              </p>
            </div>
          </div>
        }
        withoutShare>
        <LivraisonEtiquette animated id='animated' />
      </Shareable>
    </div>
  )
}

export default LivraisonEtiquettes
