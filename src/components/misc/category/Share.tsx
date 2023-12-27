import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from 'components/base/ClipboardBox'
import { Icon } from 'components/osezchanger/icons'
import { CustomParamType, CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { Buttons, Meta } from './Share.styles'

const Share = ({
  category,
  params,
  path,
}: {
  category: Category
  params?: Record<string, CustomParamValue>
  path?: string
}) => {
  const [customValues, setCustomValues] = useState<Record<string, CustomParamType> | null>(null)

  useEffect(() => {
    if (params) {
      const values: Record<string, CustomParamType> = {}
      Object.entries(params).forEach(([key, value]) => {
        values[key] = {
          value,
          visible: customValues && customValues[key] ? customValues[key].visible : true,
        }
      })
      setCustomValues(values)
    }
  }, [params, setCustomValues])

  const url = buildCurrentUrlFor(
    `${path || category.slug}${
      customValues
        ? `?${Object.entries(customValues)
            .filter(([, { visible }]) => visible)
            .map(([key, { value }]) => {
              if (typeof value === 'string') {
                return `${key}=${value}`
              }
              if (value.start && value.end) {
                return `${key}Start=${value.start}&${key}End=${value.end}`
              }

              if (value.start) {
                return `${key}Start=${value.start}`
              }

              if (value.end) {
                return `${key}End=${value.end}`
              }
            })
            .join('&')}`
        : ''
    }`
  )
  return (
    <>
      {customValues && (
        <CustomParams
          tracking={category.name}
          trackingType='Partager'
          customValues={customValues}
          setCustomValues={setCustomValues}
        />
      )}
      <ClipboardBox>{url}</ClipboardBox>
      <Buttons>
        <FacebookShareButton
          url={url}
          title='Partager sur facebook'
          onClick={() => track(category.name, 'Share Facebook', `${category.slug}_facebook`)}>
          <Icon iconId='facebook' />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          onClick={() => track(category.name, 'Share Twitter', `${category.slug}_twitter`)}>
          <Icon iconId='twitter' />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          onClick={() => track(category.name, 'Share Whatsapp', `${category.slug}_whatsapp`)}>
          <Icon iconId='whatsapp' />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          onClick={() => track(category.name, 'Share Linkedin', `${category.slug}_linkedin`)}>
          <Icon iconId='linkedin' />
        </LinkedinShareButton>
      </Buttons>
      <Meta>
        <Image src={`/meta/${category.slug}.png`} width={728} height={382.2} alt='' />
        <p>
          <b>{category.meta.title}</b>
        </p>
        <p className='text-sm'>{category.meta.description}</p>
      </Meta>
    </>
  )
}

export default Share
