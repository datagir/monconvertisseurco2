import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode } from 'react'
import CheckIcon from 'components/base/icons/check'
import styles from './CheckboxInput.module.css'

const CheckboxInput = ({
  checked,
  setChecked,
  label,
  children,
  className,
  'data-testid': dataTestId,
  ...inputProps
}: {
  checked: boolean
  className?: string
  setChecked: (checked: boolean) => void
  label: ReactNode
  children?: ReactNode
  ['data-testid']?: string
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={classNames(styles.container, className)} data-testid={dataTestId}>
      <label className={classNames(styles.legend, { [styles.checked]: checked })}>
        <input
          {...inputProps}
          type='checkbox'
          checked={checked}
          className={checked ? 'checked' : ''}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {label}
        {checked && (
          <div className={styles.check}>
            <CheckIcon />
          </div>
        )}
      </label>
      {children}
    </div>
  )
}

export default CheckboxInput
