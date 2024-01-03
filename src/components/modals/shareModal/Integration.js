import React from 'react'
import styled from 'styled-components'
import Link from 'components/base/buttons/Link'

const Wrapper = styled(Link)`
  align-items: center;
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 3.5rem;
  justify-content: center;
  width: 3.5rem;
`
const Svg = styled.svg`
  width: 2.2rem !important;

  ${(props) => props.theme.mq.small} {
    width: 1.7rem;
  }
  path {
    fill: ${(props) => props.theme.colors.background}!important;
  }
`
export default function Integration() {
  return (
    <Wrapper href={'/integration'}>
      <Svg x='0px' y='0px' width='94.504px' height='94.504px' viewBox='0 0 94.504 94.504'>
        <path d='M93.918,45.833L69.799,21.714c-0.75-0.75-2.077-0.75-2.827,0l-5.229,5.229c-0.781,0.781-0.781,2.047,0,2.828    l17.477,17.475L61.744,64.724c-0.781,0.781-0.781,2.047,0,2.828l5.229,5.229c0.375,0.375,0.884,0.587,1.414,0.587    c0.529,0,1.039-0.212,1.414-0.587l24.117-24.118C94.699,47.881,94.699,46.614,93.918,45.833z' />
        <path d='M32.759,64.724L15.285,47.248l17.477-17.475c0.375-0.375,0.586-0.883,0.586-1.414c0-0.53-0.21-1.039-0.586-1.414    l-5.229-5.229c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L0.585,45.833    c-0.781,0.781-0.781,2.047,0,2.829L24.704,72.78c0.375,0.375,0.884,0.587,1.414,0.587c0.53,0,1.039-0.212,1.414-0.587l5.229-5.229    C33.542,66.771,33.542,65.505,32.759,64.724z' />
        <path d='M60.967,13.6c-0.254-0.466-0.682-0.812-1.19-0.962l-4.239-1.251c-1.058-0.314-2.172,0.293-2.484,1.352L33.375,79.382    c-0.15,0.509-0.092,1.056,0.161,1.521c0.253,0.467,0.682,0.812,1.19,0.963l4.239,1.251c0.189,0.056,0.38,0.083,0.567,0.083    c0.863,0,1.66-0.564,1.917-1.435l19.679-66.644C61.278,14.612,61.221,14.065,60.967,13.6z' />
      </Svg>
    </Wrapper>
  )
}
