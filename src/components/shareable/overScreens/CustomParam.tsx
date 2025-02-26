import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { Equivalent } from 'types/equivalent'
import { deplacements } from 'data/categories/deplacement'
import { AlimentationCategories } from 'utils/alimentation'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import { Point } from 'hooks/useItineraries'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import Select from 'components/form/Select'
import SelectEquivalent from 'components/form/SelectEquivalent'
import AddressInput from 'components/form/addresses/AddressInput'
import styles from './CustomParam.module.css'

const configs: Record<
  string,
  {
    type: 'number' | 'text' | 'select' | 'select-number' | 'select-equivalent' | 'boolean' | 'checkbox' | 'radio'
    equivalents?: Equivalent[]
    unit?: string
    min?: number
    max?: number
    options?: { label: string; value: string | number }[]
    values?: string[]
  }
> = {
  alimentationCategoryIntegrate: {
    type: 'radio',
    options: Object.values(AlimentationCategories).map((category) => ({
      value: category,
      label: category,
    })),
  },
  alimentationCategory: {
    type: 'radio',
    options: Object.values(AlimentationCategories).map((category) => ({
      value: category,
      label: category,
    })),
  },
  customList: {
    type: 'boolean',
  },
  hideButtons: {
    type: 'boolean',
  },
  transport: { type: 'select-equivalent', equivalents: deplacements },
  presentiel: { type: 'number', unit: 'jour', min: 0, max: 7 },
  homeOffice: { type: 'number', unit: 'jour', min: 0, max: 7 },
  m2: {
    type: 'number',
    unit: 'm2',
    min: 1,
    max: 1000,
  },
  km: {
    type: 'number',
    unit: 'km',
    min: 1,
    max: 10000,
  },
  roundTrip: {
    type: 'boolean',
  },
  withFabrication: {
    type: 'boolean',
  },
  month: {
    type: 'select-number',
    options: monthsOptions,
  },
  display: {
    type: 'checkbox',
    values: ['simulator', 'graphic'],
  },
  theme: {
    type: 'select',
    options: [
      { value: 'default', label: 'clair' },
      { value: 'night', label: 'sombre' },
    ],
  },
  language: {
    type: 'select',
    options: [
      { value: 'fr', label: 'fr' },
      { value: 'en', label: 'en' },
      { value: 'es', label: 'es' },
    ],
  },
}

export type CustomParamValue =
  | {
      value: string | number | boolean
      setter: (value: string | number | boolean) => void
    }
  | {
      start: { value: string; setter: Dispatch<SetStateAction<Point | undefined>> }
      end: { value: string; setter: Dispatch<SetStateAction<Point | undefined>> }
    }
  | { value: { emoji: string; label: string }[]; params: string }

const CustomParam = ({
  tracking,
  slug,
  param,
  visible,
  setVisible,
  integration,
  disabled,
}: {
  tracking: string
  slug: string
  param: CustomParamValue
  visible: boolean
  setVisible?: (visbile: boolean) => void
  integration?: boolean
  disabled?: boolean
}) => {
  const t = useTranslations('overscreen')
  if ('setter' in param) {
    const config = configs[slug]
    return (
      <div className={styles.container}>
        {config.type !== 'boolean' && config.type !== 'checkbox' && config.type !== 'radio' && setVisible && (
          <CheckboxInput
            id={`${slug}.title`}
            checked={visible}
            setChecked={setVisible}
            label={t(`${slug}.title`)}
            data-testid={`custom-param-${slug}-checkbox`}
          />
        )}
        <div className={classNames(styles.inputContainer, { [styles.fullWidth]: !setVisible })}>
          {config.type !== 'boolean' && (
            <HiddenLabel htmlFor={`${config.options ? 'text-select' : 'input'}-${slug}`}>
              {t(`${slug}.title`)}
            </HiddenLabel>
          )}
          {config.options ? (
            config.type === 'radio' ? (
              <Radio id={slug} label={t(`${slug}.title`)} required>
                {config.options.map((option) => (
                  <RadioInput
                    key={option.value}
                    value={option.value as string}
                    selected={param.value as string}
                    setSelected={(value) => param.setter(value as string)}
                    label={t(`${slug}.${option.label}`)}
                    disabled={disabled}
                  />
                ))}
              </Radio>
            ) : (
              <Select
                required
                padding='sm'
                label={setVisible ? '' : t(`${slug}.label`)}
                inline={!setVisible}
                id={slug}
                disabled={!visible}
                value={param.value.toString()}
                onChange={(event) => {
                  track(tracking, `Custom value ${slug}`, JSON.stringify(event.target.value))
                  param.setter(config.type === 'select' ? event.target.value : Number(event.target.value))
                }}
                data-testid={`custom-param-${slug}-select`}>
                {config.options.map((option) => (
                  <option value={option.value} key={option.value}>
                    {t(`${slug}.${option.label}`)}
                  </option>
                ))}
              </Select>
            )
          ) : config.equivalents ? (
            <>
              <SelectEquivalent
                id='select-equivalent'
                equivalents={config.equivalents}
                value={param.value.toString()}
                onChange={(event) => {
                  param.setter(event.target.value)
                }}
                disabled={!visible}
              />
            </>
          ) : config.type === 'boolean' ? (
            <CheckboxInput
              id={`custom-param-${slug}-checkbox`}
              data-testid={`custom-param-${slug}-checkbox`}
              checked={param.value as boolean}
              setChecked={param.setter}
              label={t(`${slug}.title`)}
            />
          ) : config.type === 'checkbox' && config.values ? (
            <Checkbox label={t(`${slug}.title`)} id={slug} required>
              {config.values.map((value) => (
                <CheckboxInput
                  id={`${slug}.${value}`}
                  key={`${slug}.${value}`}
                  data-testid={`custom-param-${slug}-${value}-checkbox`}
                  checked={!param.value || param.value === value}
                  setChecked={(checked) => {
                    if (checked) {
                      param.setter(param.value ? '' : value)
                    } else {
                      param.setter(param.value ? '' : (config.values?.find((x) => x !== value) as string))
                    }
                  }}
                  label={t(`${slug}.${value}`)}
                />
              ))}
            </Checkbox>
          ) : (
            <Input
              id={slug}
              unit={formatName(t(`${slug}.unit`), param.value as number)}
              secondaryUnitStyle
              padding='sm'
              disabled={!visible}
              type={config.type}
              value={param.value as string | number}
              onChange={(event) => {
                track(tracking, `Custom value ${slug}`, JSON.stringify(event.target.value))
                if (config.type === 'number') {
                  if (!event.target.value) {
                    return param.setter('')
                  }

                  const value = Number(event.target.value)
                  if (config.min && value < config.min) {
                    param.setter(config.min)
                    return
                  }
                  if (config.max && value > config.max) {
                    param.setter(config.max)
                    return
                  }
                  param.setter(value)
                  return
                }
                param.setter(event.target.value)
              }}
              min={config.min}
              max={config.max}
              data-testid={`custom-param-${slug}-input`}
            />
          )}
        </div>
      </div>
    )
  }

  if ('start' in param) {
    return (
      <div className={styles.container}>
        {setVisible && (
          <CheckboxInput checked={visible} setChecked={setVisible} label={t(`${slug}.label`)} id={`${slug}.label`} />
        )}
        <div className={styles.inputs}>
          <AddressInput
            id={`custom-${slug}-start`}
            label={t(`${slug}.start`)}
            required
            disabled={!visible}
            place={param.start.value}
            setPlace={(place) => {
              track(tracking, `Custom value ${slug}`, typeof place === 'object' ? place.address : '')
              param.start.setter(place)
            }}
          />
          <AddressInput
            id={`custom-${slug}-end`}
            label={t(`${slug}.end`)}
            required
            disabled={!visible}
            place={param.end.value}
            setPlace={(place) => {
              track(tracking, `Custom value ${slug}`, typeof place === 'object' ? place.address : '')
              param.end.setter(place)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {setVisible && (
        <CheckboxInput
          checked={visible}
          setChecked={setVisible}
          label={`${t(integration ? 'integrate' : 'share')} ${t(slug)}`}
          data-testid={`custom-param-${slug}-checkbox`}
          id={`custom-param-${slug}-checkbox`}
        />
      )}
      <div className={styles.params}>
        {param.value.map(({ emoji, label }) => (
          <div className={styles.param} key={emoji}>
            <EquivalentIcon equivalent={{ slug: emoji }} height={0.75} />
            <span className='text-sm'>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomParam
