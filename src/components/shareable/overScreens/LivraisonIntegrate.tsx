'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { LivraisonType } from 'components/outils/livraison/Type'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import styles from './CustomParam.module.css'
import IntegratePreview from './IntegratePreview'
import LivraisonListParam from './LivraisonListParam'
import shareStyles from './Share.module.css'

const allTypes = Object.values(LivraisonType)

const LivraisonIntegrate = () => {
  const t = useTranslations('overscreen')
  const { theme, language, setTheme, setLanguage, livraison } = useParamContext()

  const [showButtons, setShowButtons] = useState(true)
  const [withFabrication, setWithFabrication] = useState(livraison.withFabrication)

  const [types, setTypes] = useState(allTypes)

  useEffect(() => {
    setWithFabrication(livraison.withFabrication)
  }, [livraison.withFabrication])

  const search = useMemo(() => {
    const result = `&theme=${theme}&language=${language}`
    const hideButtonsParam = showButtons ? '' : '&hideButtons=true'
    const withFabricationParam = withFabrication ? '&withFabrication=true' : ''
    const typesParam = types.length === allTypes.length ? '' : `&types=${types.join(',')}`
    return `${withFabricationParam}${hideButtonsParam}${result}${typesParam}`
  }, [withFabrication, showButtons, theme, language, types])

  return (
    <>
      <form id='livraison-integrate'>
        <fieldset>
          <legend className={styles.title}>{t('withFabrication.description')}</legend>
          <CustomParam
            tracking='Livraison'
            slug='withFabrication'
            integration
            visible
            param={{ value: withFabrication, setter: setWithFabrication } as CustomParamValue}
          />
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.title}>{t('customFabricationList.description')}</legend>
          <LivraisonListParam types={types} setTypes={setTypes} />
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.title}>{t('hideButtons.description')}</legend>
          <CustomParam
            tracking='Livraison'
            slug='hideButtons'
            integration
            visible
            param={{ value: showButtons, setter: setShowButtons } as CustomParamValue}
          />
        </fieldset>
        <div className={shareStyles.separator} />
        <CustomParam
          tracking='Livraison'
          slug='theme'
          param={{ value: theme, setter: setTheme } as CustomParamValue}
          visible
        />
        <CustomParam
          tracking='Livraison'
          slug='language'
          param={{ value: language, setter: setLanguage } as CustomParamValue}
          visible
        />
      </form>
      <ClipboardBox
        form='livraison-integrate'
        tracking='Livraison'>{`<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="/livraison" data-search="?${search}"></script>`}</ClipboardBox>
      <IntegratePreview path='/livraison' urlParams={search} />
    </>
  )
}

export default LivraisonIntegrate
