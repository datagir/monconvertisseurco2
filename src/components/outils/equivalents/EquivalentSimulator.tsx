import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import EquivalentCardContent from './EquivalentCardContent'
import styles from './EquivalentSimulator.module.css'
import Detail from './detail/Detail'

const EquivalentSimulator = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  return (
    <>
      <div className={styles.header}>
        <EquivalentCardContent equivalent={equivalent} category={category} />
        {equivalent.include?.pre && (
          <div className={styles.hypothesis}>
            <div className={styles.hypothesisTitle}>Hypothèses</div>
            <div>{equivalent.include.pre}</div>
          </div>
        )}
      </div>
      <Detail equivalent={equivalent} />
    </>
  )
}

export default EquivalentSimulator
