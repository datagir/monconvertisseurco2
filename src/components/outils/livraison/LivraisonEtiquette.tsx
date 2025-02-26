'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import { buildCurrentUrlFor } from 'utils/urls'
import CloseIcon from 'components/base/icons/close'
import InformationIcon from 'components/base/icons/information'
import Logo from 'components/externalModules/Logo'
import LivraisonEquivalent from './LivraisonEquivalent'
import styles from './LivraisonEtiquette.module.css'
import Progress from './Progress'

const livraisonEquivalents = computedEquivalents
  .filter((equivalent) => equivalent.category === 12)
  .sort((a, b) => a.value - b.value)

const LivraisonEtiquette = ({ animated, id }: { animated?: boolean; id: string }) => {
  const t = useTranslations('livraison')

  const [toDisplay, setToDisplay] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [displayDisclaimer, setDisplayDisclaimer] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>{t.rich('etiquette', { important: (chunk) => <span className={styles.bold}>{chunk}</span> })}</p>
          <button
            aria-controls={`etiquette-${id}-disclaimer`}
            aria-expanded={displayDisclaimer}
            title='Afficher les informations de contenus'
            className={classNames(styles.disclaimerButton, { [styles.disclaimerAnimated]: animated })}
            onClick={() => setDisplayDisclaimer(!displayDisclaimer)}>
            {displayDisclaimer ? <CloseIcon /> : <InformationIcon />}
          </button>
        </div>
        <Logo
          url={buildCurrentUrlFor('/outils/livraison')}
          right
          title='Lien externe : accéder au simulateur livraison sur le site Impact CO2'
        />
        {animated && (
          <Progress length={livraisonEquivalents.length} setFadeIn={setFadeIn} setToDisplay={setToDisplay} />
        )}
      </div>
      <ul className={animated ? styles.animatedList : ''}>
        {livraisonEquivalents.map((livraisonEquivalent, index) => (
          <li
            key={livraisonEquivalent.slug}
            className={
              animated
                ? index === toDisplay && !fadeIn
                  ? styles.visibleAnimatedComparison
                  : styles.animatedComparison
                : styles.comparison
            }>
            <LivraisonEquivalent
              index={index}
              animated={animated}
              equivalent={livraisonEquivalent}
              max={livraisonEquivalents[livraisonEquivalents.length - 1].value}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LivraisonEtiquette
