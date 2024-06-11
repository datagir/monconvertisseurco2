import { Metadata } from 'next'
import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { getExamples } from 'utils/examples'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  return {
    title: 'Comparateur carbone | Impact CO₂',
    description:
      'Comparer et visualiser facilement une quantité de CO₂e grâce au comparateur d’Impact CO₂ et à ses équivalents pour avoir en tête les bons ordres de grandeur.',
    openGraph: {
      creators: 'ADEME',
      images:
        Object.entries(searchParams).length === 0
          ? 'meta/comparateur.png'
          : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${Object.entries(searchParams)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`,
    },
  }
}

const page = async () => {
  const examples = await getExamples()
  const faqs = await getFAQs()
  return (
    <>
      <ComparateurPage examples={examples} faqs={faqs} />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
