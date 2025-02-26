import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { Language } from 'types/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import LocalNumber from 'components/base/LocalNumber'
import EqualIcon from 'components/base/icons/equal'
import RefreshIcon from 'components/base/icons/refresh'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './ColumnEquivalent.module.css'
import Disclaimer from './Disclaimer'
import baseStyles from './Equivalent.module.css'
import Progress from './Progress'

const ColumnEquivalent = ({
  baseValue,
  comparisons,
  language,
  randomize,
  animated,
}: {
  baseValue: string | number
  comparisons: string[]
  language: Language
  randomize?: () => void
  animated?: boolean
}) => {
  const isAnimated = useMemo(() => animated && comparisons.length > 1, [animated, comparisons])
  const [toDisplay, setToDisplay] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (isAnimated) {
      setToDisplay(0)
      setFadeIn(false)
    }
  }, [isAnimated, comparisons])

  const intValue = Number(baseValue)
  const preciseValue = Number.isNaN(intValue) ? 100000 : intValue
  const { unit, value } = getNumberPrecision(preciseValue / 1000)

  return (
    <div className={classNames(styles.container, { [styles.withRandomize]: !!randomize })}>
      <div className={baseStyles.top}>
        <div className={styles.leftContent}>
          <div className={baseStyles.value} data-testid='etiquette-value'>
            <LocalNumber number={value} />
          </div>
          <div className={baseStyles.label}>{unit} CO₂e</div>
        </div>
        <Logo value={preciseValue} right />
      </div>
      <div className={baseStyles.rightColumn}>
        <div className={isAnimated ? baseStyles.animatedEqualColumn : baseStyles.equalColumn}>
          <EqualIcon />
        </div>
        <div className={styles.rightContent}>
          {isAnimated && (
            <Progress
              className={baseStyles.progressBarColumn}
              comparisons={comparisons}
              setFadeIn={setFadeIn}
              setToDisplay={setToDisplay}
            />
          )}
          <Disclaimer
            language={language}
            comparisons={comparisons}
            unit={unit}
            value={value}
            column
            id={animated ? 'animated' : 'static'}
          />
          <ul className={isAnimated ? styles.animatedComparisonsColumn : ''}>
            {comparisons.map((comparison, index) => (
              <li
                key={comparison}
                className={
                  index === toDisplay && !fadeIn ? styles.visibleAnimatedComparison : styles.animatedComparison
                }>
                <SimpleValue value={preciseValue} comparison={comparison} language={language} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {randomize && (
        <button className={baseStyles.columnRandomize} title='Obtenir une nouvelle comparaison' onClick={randomize}>
          <RefreshIcon />
        </button>
      )}
    </div>
  )
}

export default ColumnEquivalent
