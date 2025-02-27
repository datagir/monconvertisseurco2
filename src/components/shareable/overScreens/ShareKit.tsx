import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import ToolCard from 'components/cards/ToolCard'
import styles from './ShareKit.module.css'

const extraKits: Record<string, { slug: string; link: string; image: string }> = {
  livraison: {
    slug: 'livraisonKit',
    link: '/doc/kit-communication',
    image: '/images/tools-livraison.svg',
  },
}
const ShareKit = ({ extraKit }: { extraKit?: string }) => {
  const t = useTranslations('overscreen')

  const extraKitInformations = useMemo(() => (extraKit ? extraKits[extraKit] : undefined), [extraKit])
  return (
    <>
      <div className={styles.separatorBothBorders} />
      <div className={styles.kit}>
        <p className={styles.kitTitle}>{t('communicate')}</p>
        {extraKitInformations && (
          <ToolCard
            slug={extraKitInformations.slug}
            horizontal
            image={extraKitInformations.image}
            link={extraKitInformations.link}
            title={t(`${extraKitInformations.slug}Title`)}
            description={t(`${extraKitInformations.slug}Description`)}
            linkLabel={t(`${extraKitInformations.slug}Link`)}
          />
        )}
        <ToolCard
          slug='kit'
          horizontal
          image='/images/doc-kit.svg'
          title={t('kitTitle')}
          description={t('kitDescription')}
          linkLabel={t('kitLink')}
          link='/doc/kit-communication'
        />
      </div>
    </>
  )
}

export default ShareKit
