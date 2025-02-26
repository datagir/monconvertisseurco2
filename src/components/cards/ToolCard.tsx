'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode, useMemo } from 'react'
import { track } from 'utils/matomo'
import IframeableLink from 'components/base/IframeableLink'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './ToolCard.module.css'

export type ToolCardProps = {
  slug: string
  title: string
  description: ReactNode
  linkLabel: string
  horizontal?: boolean
  link?: string
  image?: string
}

const ToolCard = ({ slug, title, description, linkLabel, horizontal, link, image }: ToolCardProps) => {
  const isNew = useMemo(() => {
    const news = process.env.NEXT_PUBLIC_NEWS
    if (news) {
      const tools = JSON.parse(news)
      const limit = tools[slug]
      if (limit) {
        const now = new Date().getTime()
        const limitTime = new Date(limit).getTime()
        return now < limitTime
      }
    }
    return false
  }, [slug])

  return (
    <li
      className={classNames(styles.list, {
        [styles.horizontalList]: horizontal,
      })}>
      {isNew && (
        <div className={classNames(styles.tag, { [styles.horizontalTag]: horizontal })}>
          {horizontal ? 'Nouveau !' : 'Nouvel outil !'}
        </div>
      )}
      <IframeableLink
        href={link || `/outils/${slug}`}
        target={link && link.startsWith('http://') ? '_blank' : undefined}
        rel={link && link.startsWith('http://') ? 'noreferrer noopener' : undefined}
        className={classNames(styles.card, {
          [styles.horizontalCard]: horizontal,
        })}
        onClick={() => {
          track('Outils', link || `/outils/${slug}`, 'click')
        }}>
        <Image src={image || `/images/tools-${slug}.svg`} width={220} height={180} alt='' />
        <div className={styles.content}>
          <div>
            <p className={styles.title}>{title}</p>
            {typeof description === 'string' ? <p>{description}</p> : <div>{description}</div>}
          </div>
          <div className={styles.link}>
            {linkLabel}
            <FullArrowRightIcon />
          </div>
        </div>
      </IframeableLink>
    </li>
  )
}

export default ToolCard
