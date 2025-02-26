'use client'

import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import styles from './Share.module.css'
import ShareKit from './ShareKit'
import ShareUrl from './ShareUrl'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({
  category,
  path,
  tracking,
  anchor,
  noLanguage,
  extraKit,
}: {
  category?: Pick<Category, 'slug' | 'name'>
  path?: string
  tracking?: string
  anchor?: string
  noLanguage?: boolean
  extraKit?: string
}) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const params = useMemo(
    () =>
      category
        ? getCustomParams(category.slug, allParams)
        : path?.startsWith('outils/comparateur')
          ? getComparateurParams(allParams, path?.includes('etiquette'))
          : {},
    [allParams, category, path]
  )

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params, setVisibility])

  const url = buildCurrentUrlFor(
    `${path || `outils/${category?.slug === 'repas' ? 'alimentation' : category?.slug}`}?${buildCustomParamsUrl(params, visibility)}${noLanguage ? '' : `&language=${allParams.language}`}${category?.slug === 'repas' ? '#repas' : ''}${anchor ? `#${anchor}` : ''}`
  ).replace(/\?$/, '')
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'

  return (
    <>
      <form id={`${category}-share`}>
        {params && visibility && (
          <>
            <CustomParams
              tracking={trackingValue}
              trackingType='Partager'
              params={params}
              visibility={visibility}
              setVisibility={setVisibility}
            />
            {Object.keys(params).length > 0 && <div className={styles.separator} />}
          </>
        )}
        {!noLanguage && (
          <CustomParam
            tracking={trackingValue}
            slug='language'
            integration
            param={{ value: allParams.language, setter: allParams.setLanguage } as CustomParamValue}
            visible
          />
        )}
      </form>
      <ShareUrl
        form={`${category}-share`}
        url={url}
        tracking={tracking}
        path={path}
        category={category}
        customImage={
          category
            ? undefined
            : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${buildCustomParamsUrl(params, visibility)}&language=${allParams.language}`
        }
      />
      <ShareKit extraKit={extraKit} />
    </>
  )
}

export default Share
