import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import { Dispatch } from 'react'
import { LivraisonType } from 'components/outils/livraison/Type'
import CheckboxInput from 'components/form/CheckboxInput'
import styles from './TransportListParam.module.css'

const allTypes = Object.values(LivraisonType)

const LivraisonListParam = ({
  types,
  setTypes,
}: {
  types: LivraisonType[]
  setTypes: Dispatch<SetStateAction<LivraisonType[]>>
}) => {
  const t = useTranslations('livraison')
  return (
    <ul className={styles.equivalents}>
      {allTypes.map((type) => (
        <li key={type} className={styles.list}>
          <CheckboxInput
            id={`livraison-list-${type}-checkbox`}
            reversed
            className={classNames(styles.mode, styles.active)}
            labelClassName={styles.modeLabel}
            checked={types.includes(type)}
            setChecked={(checked) => setTypes(checked ? [...types, type] : types.filter((value) => value !== type))}
            disabled={types.length === 1 && types[0] === type}
            label={
              <span className={styles.left}>
                <span className={styles.name}>{t(type)}</span>
              </span>
            }
          />
        </li>
      ))}
    </ul>
  )
}

export default LivraisonListParam
