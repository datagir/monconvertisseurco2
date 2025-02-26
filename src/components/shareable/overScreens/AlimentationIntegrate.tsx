'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import AlimentationListParam from './AlimentationListParam'
import CustomParam, { CustomParamValue } from './CustomParam'
import styles from './CustomParam.module.css'
import IntegratePreview from './IntegratePreview'
import shareStyles from './Share.module.css'

const AlimentationIntegrate = () => {
  const t = useTranslations('overscreen')
  const { theme, language, setTheme, setLanguage, alimentation: alimentationParams } = useParamContext()

  const [showButtons, setShowButtons] = useState(true)
  const [category, setCategory] = useState(alimentationParams.category)
  const [customList, setCustomList] = useState(alimentationParams.customList)
  const [equivalents, setEquivalents] = useState(alimentationParams.equivalents)

  useEffect(() => {
    setCategory(alimentationParams.category)
  }, [alimentationParams.category])

  const search = useMemo(() => {
    const result = `&theme=${theme}&language=${language}`
    const hideButtonsParam = showButtons ? '' : '&hideButtons=true'
    if (customList) {
      return `alimentationEquivalents=${equivalents.join(',')}${hideButtonsParam}${result}`
    }
    return `alimentationCategory=${category}${hideButtonsParam}${result}`
  }, [category, customList, equivalents, showButtons, theme, language])

  return (
    <>
      <form id='alimentation-integrate'>
        <CustomParam
          tracking='Alimentation'
          slug='alimentationCategoryIntegrate'
          integration
          visible
          disabled={customList}
          param={{ value: category, setter: setCategory } as CustomParamValue}
        />
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.title}>{t('customList.description')}</legend>
          <CustomParam
            tracking='Alimentation'
            slug='customList'
            integration
            visible
            param={{ value: customList, setter: setCustomList } as CustomParamValue}
          />
          {customList && <AlimentationListParam equivalents={equivalents} setEquivalents={setEquivalents} />}
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.title}>{t('hideButtons.description')}</legend>
          <CustomParam
            tracking='Alimentation'
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
        form='alimentation-integrate'
        tracking='Alimentation'>{`<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="/alimentation" data-search="?${search}"></script>`}</ClipboardBox>
      <IntegratePreview path='/alimentation' urlParams={search} />
    </>
  )
}

export default AlimentationIntegrate
