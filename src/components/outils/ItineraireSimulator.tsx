'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import CheckboxInput from 'components/form/CheckboxInput'
import AddressInput from 'components/form/addresses/AddressInput'
import CategorySimulator from './CategorySimulator'
import styles from './ItineraireSimulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const ItineraireSimulator = ({ withComparisonMode }: { withComparisonMode: boolean }) => {
  const {
    transport: { comparisonMode },
    itineraire: { start, setStart, end, setEnd, displayAll, setDisplayAll, roundTrip, setRoundTrip },
  } = useParamContext()

  const t = useTranslations('transport.itineraire')

  const { data: itineraries } = useItineraries(start, end, 'itinéraire')
  const { hasMore, equivalents } = useTransportations('Transport itinéraire', 'itineraire', itineraries)

  return (
    <>
      <div className={styles.simulator}>
        <div className={styles.addresses}>
          <AddressInput
            large
            id='itineraire-start'
            label={t('start')}
            required
            place={start?.address}
            setPlace={setStart}
          />
          <AddressInput large id='itineraire-end' label={t('end')} required place={end?.address} setPlace={setEnd} />
        </div>
        <div className={styles.roundTrip}>
          <CheckboxInput id='roundTrip' label={t('roundTrip')} checked={roundTrip} setChecked={setRoundTrip} />
        </div>
        <p>{t('header')}</p>
      </div>
      {start && end && itineraries && (
        <>
          {withComparisonMode && <TransportComparisonMode tracking='Transport itinéraire' />}
          {comparisonMode === 'list' ? (
            <CategorySimulator
              tracking='Transport itinéraire'
              equivalents={equivalents}
              displayAll={displayAll}
              setDisplayAll={hasMore ? setDisplayAll : undefined}
              moreText='transport'
              withSimulator
              type='itineraire'
            />
          ) : (
            <TransportComparisonSimulator tracking='Transport itinéraire' equivalents={equivalents} />
          )}
        </>
      )}
    </>
  )
}

export default ItineraireSimulator
