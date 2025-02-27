'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import useParamContext, { Params } from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import CategoryDisplayAll from './CategoryDisplayAll'
import styles from './CategorySimulator.module.css'
import PlusMinus from './plusMinus/PlusMinus'

const getValue = (equivalent: ComputedEquivalent, params: Params, type?: TransportSimulateur) => {
  if (type && equivalent.initialValue) {
    const carpool = params[type].carpool[equivalent.slug] || 1
    return equivalent.initialValue / (carpool + 1)
  }

  const distance = params.livraison.distance[equivalent.slug]
  const transport = params.livraison.transport[equivalent.slug]
  if (distance && transport && equivalent.initialValue) {
    return equivalent.initialValue
  }

  return equivalent.value
}

const livraisonECVs = [54, 55]
const deplacementECVs = [56, 57, 58]

const computeLegends = (equivalents: ComputedEquivalent[]) => {
  if (!equivalents) {
    return null
  }

  if (equivalents.some((equivalent) => equivalent.livraison)) {
    const livraisonECVs = [
      { label: 'logistique', style: styles.stripped },
      { label: 'deplacement', style: styles.plain },
    ]
    if (
      equivalents.some(
        (equivalent) => 'ecv' in equivalent && equivalent.ecv && equivalent.ecv?.some((ecv) => ecv.id === 59)
      )
    ) {
      return [{ label: 'fabrication', style: styles.gray }].concat(livraisonECVs)
    }
    return livraisonECVs
  }

  if (equivalents.some((equivalent) => formatUsage(equivalent))) {
    return [
      { label: 'usage', style: styles.stripped },
      { label: 'construction', style: styles.plain },
    ]
  }
}

const getDetail = (equivalent: ComputedEquivalent) => {
  if ('ecv' in equivalent && equivalent.ecv && equivalent.ecv?.some((ecv) => livraisonECVs.includes(ecv.id))) {
    const deplacement =
      (100 *
        equivalent.ecv.filter((ecv) => deplacementECVs.includes(ecv.id)).reduce((acc, ecv) => acc + ecv.value, 0)) /
      equivalent.value
    if (equivalent.ecv.some((ecv) => ecv.id === 59)) {
      const fabrication = (100 * (equivalent.ecv.find((ecv) => ecv.id === 59)?.value || 0)) / equivalent.value
      return [
        { label: 'fabrication', value: fabrication },
        { label: 'logistique', value: 100 - fabrication - deplacement },
        { label: 'deplacement', value: deplacement },
      ]
    } else {
      return [
        { label: 'logistique', value: 100 - deplacement },
        { label: 'deplacement', value: deplacement },
      ]
    }
  }

  const usage = formatUsage(equivalent)
  const percent = (100 * usage) / equivalent.value
  return [
    { label: 'usage', value: percent },
    { label: 'construction', value: 100 - percent },
  ]
}

const CategorySimulator = ({
  id,
  tracking,
  equivalents,
  displayAll,
  setDisplayAll,
  moreText,
  withSimulator,
  type,
  reverse,
  bis,
}: {
  id?: string
  tracking: string
  equivalents: ComputedEquivalent[]
  displayAll?: boolean
  setDisplayAll?: Dispatch<SetStateAction<boolean>>
  moreText?: string
  withSimulator?: boolean
  type?: TransportSimulateur
  reverse?: boolean
  bis?: boolean
}) => {
  const params = useParamContext()
  const t = useTranslations('category-simulator')

  const ref = useRef<HTMLUListElement>(null)
  const firstElementRef = useRef<HTMLAnchorElement>(null)
  const max = Math.max.apply(null, equivalents?.map((equivalent) => equivalent.value) || [])
  const legends = useMemo(() => computeLegends(equivalents), [equivalents])
  const [basePercent, setBasePercent] = useState(80)
  const [legendRelative, setLegendRelative] = useState(false)
  const initialParams = useMemo(() => params, [])

  useEffect(() => {
    const onResize = () => {
      if (typeof ref !== 'function' && ref && ref.current && ref.current.parentElement) {
        const { width } = ref.current.parentElement.getBoundingClientRect()
        setBasePercent(width > 750 ? 80 : width > 700 ? 75 : width > 600 ? 70 : width > 450 ? 60 : 50)
        setLegendRelative((max && equivalents[0]?.value / max > 0.6) || false)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [equivalents, ref, max])

  useEffect(() => {
    if (displayAll && firstElementRef.current) {
      firstElementRef.current.focus()
    }
  }, [displayAll, firstElementRef])

  return (
    <div className={styles.container}>
      <ul ref={ref} id={`category-${id || ''}-equivalents-list`}>
        {equivalents &&
          equivalents
            .sort((a, b) => (getValue(a, initialParams, type) - getValue(b, initialParams, type)) * (reverse ? -1 : 1))
            .map((equivalent, index) => {
              const detail = getDetail(equivalent)
              const barExplanation = detail.map(({ label, value }) => `${label} : ${value.toFixed(0)}%`).join(', ')

              return (
                <li
                  key={equivalent.carpool ? `${equivalent.slug}-carpool` : equivalent.slug}
                  className={classNames(styles.equivalent, { [styles.noFirst]: withSimulator })}>
                  <IframeableLink
                    ref={index === 0 ? firstElementRef : undefined}
                    data-testid='category-link'
                    href={equivalent.link}
                    className={styles.link}
                    aria-live='polite'
                    aria-label={`${equivalent.name || getNameWithoutSuffix(params.language, equivalent)}${equivalent.carpool ? ` un conducteur plus ${equivalent.carpool} ${formatName('passager[s]', equivalent.carpool)}` : ''} ${formatNumber(equivalent.value)} kg CO₂e (${barExplanation})`}>
                    <EquivalentIcon equivalent={equivalent} height={3} />
                    <div className={styles.content} data-testid={`category-${equivalent.slug}`}>
                      <p className={styles.name}>
                        {equivalent.name || getNameWithoutSuffix(params.language, equivalent)}
                      </p>
                      <div className={styles.data}>
                        {equivalent.value !== 0 && (
                          <div
                            className={styles.fullBar}
                            style={{ width: max ? `${(basePercent * equivalent.value) / max}%` : '0px' }}>
                            {legends &&
                              legends.map((legend) => {
                                const value = detail.find(({ label }) => legend.label === label)?.value
                                return (
                                  value !== undefined &&
                                  value > 0 && (
                                    <div key={legend.label} className={legend.style} style={{ width: `${value}%` }} />
                                  )
                                )
                              })}
                          </div>
                        )}
                        <p>
                          <span className={styles.value} data-testid={`category-${equivalent.slug}-value`}>
                            <LocalNumber number={formatNumber(equivalent.value)} />
                          </span>{' '}
                          kg CO₂e
                        </p>
                      </div>
                      {legends && <p className='ico2-hidden'>{barExplanation}</p>}
                    </div>
                  </IframeableLink>
                  {!!equivalent.carpool && type && (
                    <div className={styles.carpool}>
                      <div className={styles.triangle} />
                      <div className={styles.conducteur}>
                        <Image src='/icons/conducteur.svg' alt='un conducteur dans la voiture' width={20} height={24} />
                      </div>
                      <PlusMinus
                        value={params[type].carpool[equivalent.slug] || 1}
                        setValue={(value) => {
                          track(
                            `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}${bis ? ' bis' : ''}`,
                            `Covoiturage ${equivalent.slug}`,
                            value.toString()
                          )
                          params[type].setCarpool({ ...params[type].carpool, [equivalent.slug]: value })
                        }}
                        max={4}
                        label={formatName(t('passenger'), params[type].carpool[equivalent.slug] || 1)}
                        hiddenLabel={`${t('in')} ${getNameWithoutSuffix(params.language, equivalent)}`}
                        icon='/icons/passager.svg'
                      />
                    </div>
                  )}
                  {!!equivalent.livraison && (
                    <div className={styles.carpool} data-testid={`livraison-${equivalent.slug}`}>
                      <div className={styles.triangle} />
                      <div className={styles.transport}>
                        <HiddenLabel htmlFor={`transport-type-${equivalent.slug}`}>{t('transportSelect')}</HiddenLabel>
                        <Select
                          id={`transport-type-${equivalent.slug}`}
                          className={styles.select}
                          value={params.livraison.transport[equivalent.slug] || 'voiturethermique'}
                          onChange={(event) => {
                            track('Livraison', `Transport ${equivalent.slug}`, event.target.value)
                            params.livraison.setTransport({
                              ...params.livraison.transport,
                              [equivalent.slug]: event.target.value,
                            })
                          }}
                          style={{
                            backgroundImage: `url('/icons/mini-${params.livraison.transport[equivalent.slug] || 'voiturethermique'}.svg')`,
                          }}>
                          <option value='voiturethermique'>{t('voiturethermique')}</option>
                          <option value='voitureelectrique'>{t('voitureelectrique')}</option>
                        </Select>
                      </div>
                      <PlusMinus
                        value={params.livraison.distance[equivalent.slug] || 1}
                        setValue={(value) => {
                          track('Livraison', `Distance ${equivalent.slug}`, value.toString())
                          params.livraison.setDistance({ ...params.livraison.distance, [equivalent.slug]: value })
                        }}
                        max={100}
                        label={'km'}
                        hiddenLabel={`${t('distance')} ${getNameWithoutSuffix(params.language, equivalent)}`}
                      />
                    </div>
                  )}
                </li>
              )
            })}
      </ul>
      {setDisplayAll && displayAll !== undefined && moreText && (
        <CategoryDisplayAll
          id={id}
          tracking={tracking}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          displayAllText={t(`${moreText}.display`)}
          hideAllText={t(`${moreText}.hide`)}
        />
      )}
      {legends && (
        <div
          className={classNames(styles.legend, {
            [styles.legendRelative]: equivalents[0]?.carpool || equivalents[1]?.carpool || legendRelative,
          })}>
          {legends.map((legend) => (
            <div key={legend.label}>
              <div className={classNames(legend.style, styles.legendBar)} />
              {t(`legend.${legend.label}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategorySimulator
