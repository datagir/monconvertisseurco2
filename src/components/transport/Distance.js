import React from 'react'
import useTransportations from 'hooks/useTransportations'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import Wrapper from 'components/misc/category/Wrapper'
import ResultHeader from './ResultHeader'
import Search from './Search'

export default function Distance(props) {
  const transportations = useTransportations()

  return (
    <Section $withoutPadding>
      <SectionWideContent $small>
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Search distance iframe={props.iframe} />
          <ResultHeader category={props.category} />
          <BarChart equivalents={transportations} category={category} />
          <CategoryLegend />
          <Bottom category={props.category} iframe={props.iframe} />
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
