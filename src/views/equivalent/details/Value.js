import React from 'react'
import styled from 'styled-components'

import { formatTotal, formatNumber } from 'utils/formatters'
import Section from 'components/base/Section'

const StyledSection = styled(Section)`
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  background-color: ${(props) => props.theme.colors.main};
`
const Top = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.background};

  border-radius: 1rem 1rem 0 0;
  transition: padding 300ms ease-out, margin 300ms ease-out;
`
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
export default function Value(props) {
  return (
    <StyledSection>
      <Section.Content>
        <Top>
          <div>
            <Number>{formatNumber(formatTotal(props.equivalent))}</Number>{' '}
            <Unit>
              kg <Big>CO2</Big>e
            </Unit>
          </div>
        </Top>
      </Section.Content>
    </StyledSection>
  )
}
