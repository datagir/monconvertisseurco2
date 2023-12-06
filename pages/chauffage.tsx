import React from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Chauffage from 'components/chauffage/Chauffage'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'

export default function ChauffagePage({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Container>
        <Chauffage category={category} />
      </Container>
      <Learning category={category} />
    </Web>
  )
}

export async function getStaticProps() {
  const category = categories.find((category) => category.slug === 'chauffage')
  if (!category) {
    return { notFound: true }
  }
  return {
    props: {
      category,
    },
  }
}

const Container = styled.div`
  margin-bottom: 2rem;
`
