'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Equivalent, EquivalentValue } from 'types/equivalent'
import PlusMinus from 'components/outils/plusMinus/PlusMinus'
import { getName } from 'utils/Equivalent/equivalent'
import InformationIcon from 'components/base/icons/information'
import shareableStyles from 'components/shareable/Shareable.module.css'
import styles from './Detail.module.css'
import DetailValue from './DetailValue'
import Label from './Label'
import Percentage from './Percentage'

type Values = {
  label: string
  icon?: string
  value: number
  values: { id: number | string; value: number }[]
}

const ecvs = (type: number, values: EquivalentValue[]): Values[] => {
  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 8:
      return [
        {
          label: 'fabrication',
          value: values.reduce((acc, current) => acc + current.value, 0),
          values,
        },
      ]
    case 5:
    case 6:
    case 7: {
      const fabrication = values.filter((value) => value.id === 5)
      const usage = values.filter((value) => value.id !== 5)
      if (usage.length) {
        return [
          {
            label: 'fabrication',
            value: fabrication.reduce((acc, current) => acc + current.value, 0),
            values: fabrication,
          },
          {
            label: 'usage',
            value: usage.filter((value) => value.id !== 5).reduce((acc, current) => acc + current.value, 0),
            values: usage,
          },
        ]
      } else {
        return [
          {
            label: 'fabrication',
            value: fabrication.reduce((acc, current) => acc + current.value, 0),
            values: fabrication,
          },
        ]
      }
    }
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 40:
    case 41:
    case 42:
    case 43:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
      return [
        {
          label: 'total',
          value: values.reduce((acc, current) => acc + current.value, 0),
          values,
        },
      ]
  }
  return []
}

export default function Detail({
  equivalent,
  noPercentage,
  noInfo,
  withSeparator,
}: {
  equivalent: Equivalent
  noPercentage?: boolean
  noInfo?: boolean
  withSeparator?: boolean
}) {
  const { setOverscreen, language } = useParamContext()
  const t = useTranslations('equivalent')
  const [years, setYears] = useState('usage' in equivalent && equivalent.usage ? equivalent.usage.defaultyears : 0)

  if (!('ecv' in equivalent) || !equivalent.ecv || equivalent.ecv.length === 0) {
    return null
  }

  const fabricationTotal = equivalent.ecv.reduce((acc, current) => acc + current.value, 0)
  const usage = 'usage' in equivalent && equivalent.usage ? years * equivalent.usage.peryear : 0
  const end = 'end' in equivalent && equivalent.end ? equivalent.end : 0

  const total = fabricationTotal + usage + end
  const unit = total > 1 ? 'kg' : 'g'

  const type = equivalent.ecv[0].id
  let usageAndEnd = null
  if (usage > 0 && end > 0) {
    usageAndEnd = {
      label: 'usage-fdv',
      icon: 'usage',
      value: usage + end,
      values: [
        { id: 8, value: usage },
        { id: 9, value: end },
      ],
    }
  } else if (usage > 0) {
    usageAndEnd = {
      label: 'usage',
      icon: 'usage',
      value: usage,
      values: [{ id: 8, value: usage }],
    }
  } else if (end > 0) {
    usageAndEnd = {
      label: 'fdv',
      icon: 'usage',
      value: end,
      values: [{ id: 9, value: end }],
    }
  }
  const values = [...ecvs(type, equivalent.ecv), usageAndEnd]
    .filter((value) => value)
    .map((value) =>
      equivalent.carpool && value
        ? {
            ...value,
            value: value.value / (equivalent.carpool + 1),
            values: value.values.map((x) => ({ ...x, value: x.value / ((equivalent.carpool || 0) + 1) })),
          }
        : value
    ) as Values[]
  const withPercent = values.length === 1

  const sum = values.reduce((acc, current) => acc + current.value, 0)
  return (
    <>
      {withSeparator && <div className={shareableStyles.separator} />}
      <table className={styles.table} role='presentation'>
        <caption className='ico2-hidden'>
          {t('detail')} {getName(language, equivalent)}
        </caption>
        <tbody>
          {values.map((value) => (
            <Fragment key={value.label}>
              <tr className={styles.main}>
                <td>
                  <div className={styles.withIcon}>
                    <Image
                      className={styles.icon}
                      src={`/images/icn-${value.icon || value.label.toLowerCase()}.svg`}
                      width={20}
                      height={20}
                      alt=''
                    />
                    {t(value.label)}
                  </div>
                </td>
                <td className={styles.percent}>
                  {withPercent || noPercentage ? ' ' : <Percentage value={(100 * value.value) / sum} />}
                </td>
                <td>
                  <DetailValue unit={unit} value={value.value} />
                </td>
              </tr>
              {value.values.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Label id={item.id} />
                  </td>
                  <td className={styles.percent}>
                    {!noPercentage && withPercent ? <Percentage value={(100 * item.value) / value.value} /> : ' '}
                  </td>
                  <td>
                    <DetailValue unit={unit} value={item.value} />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
          {!!years && (
            <>
              <tr>
                <td>
                  <b>{t('total')}</b> {t('yearly-usage')}
                  {' '}
                  {!noPercentage && !noInfo && (
                    <button
                      title='Voir les informations sur la durée de vie'
                      onClick={() => setOverscreen(equivalent.slug, 'usage')}
                      className={styles.informationButton}>
                      <InformationIcon />
                    </button>
                  )}
                </td>
                <td className={styles.usageWidgetContainer}>
                  {noPercentage ? (
                    ' '
                  ) : (
                    <PlusMinus
                      className={styles.usageWidget}
                      label={t('year')}
                      value={years}
                      setValue={setYears}
                      step={0.5}
                    />
                  )}
                </td>
                <td>
                  <b>
                    <DetailValue unit={unit} value={sum / years} />
                  </b>
                </td>
              </tr>
              <tr className={styles.noBorder}>
                <td colSpan={3} className={styles.usageWidgetContainerSmall}>
                  <PlusMinus
                    className={styles.usageWidget}
                    label={t('year')}
                    value={years}
                    setValue={setYears}
                    step={0.5}
                  />
                </td>
              </tr>
            </>
          )}
          {!withPercent && (
            <tr className={styles.main}>
              <td>
                <div className={styles.withIcon}>
                  <Image className={styles.icon} src='/images/icn-total.svg' width={20} height={20} alt='' />
                  {t('total')}
                </div>
              </td>
              <td className={styles.percent}> </td>
              <td data-testid='equivalent-total-value'>
                <DetailValue unit={unit} value={sum} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}
