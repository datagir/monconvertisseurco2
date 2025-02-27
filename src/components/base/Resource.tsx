'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { track } from 'utils/matomo'
import IframeableLink from './IframeableLink'
import NewTabIcon from './NewTabIcon'
import styles from './Resource.module.css'

const Resource = ({
  image,
  text,
  href,
  tracking,
  withLink,
  imgSize,
}: {
  image: string
  text: string
  href: string
  tracking: string
  withLink?: string
  imgSize?: string
}) => {
  const t = useTranslations('ressources')
  return (
    <IframeableLink
      className={styles.linkContainer}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      onClick={() => {
        track(tracking, `Ressource-${href}`, `${tracking.toLowerCase()}_ressource_${href}`)
      }}>
      <div className={styles.image}>
        <Image
          src={image}
          alt=''
          width={100}
          height={86}
          style={{ width: imgSize || '100%', height: imgSize || 'auto' }}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{t(text)}</p>
        {withLink && (
          <p className={styles.fakeLink}>
            <span className='text-sm'>{withLink}</span>
            <NewTabIcon />
          </p>
        )}
      </div>
    </IframeableLink>
  )
}

export default Resource
