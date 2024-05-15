import React from 'react'
import { getExamples } from 'utils/examples'
import { getNotionRevalidate } from 'components/Notion/utils'
import Home from 'components/home/Home'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const HomePage = async () => {
  const examples = await getExamples()

  return (
    <>
      <Home examples={examples} />
      <Suggestion fromLabel='Accueil' simulatorName='du site' />
    </>
  )
}

export default HomePage
