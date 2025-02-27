'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import styles from './LivraisonEquivalent.module.css'

const LivraisonEquivalent = ({
  animated,
  equivalent,
  max,
  index,
}: {
  animated?: boolean
  equivalent: ComputedEquivalent
  max: number
  index: number
}) => {
  const { language, livraison } = useParamContext()
  const t = useTranslations('livraison')

  return (
    <IframeableLink
      className={classNames(styles.container, {
        [styles.static]: !animated,
      })}
      href={`/outils/livraison/${equivalent.slug}`}>
      <EquivalentIcon equivalent={equivalent} height={2.5} />
      <div className={styles.info}>
        <p>
          {getNameWithoutSuffix(language, equivalent)}
          {livraison.distance[equivalent.slug] && <span className={styles.gray}> - {t('car')}</span>}
          {equivalent.slug.includes('douce') && <span className={styles.green}> - {t('foot')}</span>}
        </p>
        <div className={styles.barContainer}>
          <div
            className={classNames(styles.bar, {
              [styles.greenBar]: index < 2,
              [styles.plainBar]: index > 4,
            })}
            style={{ width: `${(70 * equivalent.value) / max}%` }}
          />
          <p className={styles.value}>
            <LocalNumber number={formatNumber(equivalent.value)} /> kg CO₂e
          </p>
        </div>
      </div>
    </IframeableLink>
  )
}

export default LivraisonEquivalent
