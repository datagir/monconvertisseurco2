import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 0.75em;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }

  svg {
    width: auto;
    height: 3.5em;
  }

  &:hover {
    .circle1 {
      fill: ${(props) => props.theme.colors.main};
      transition: fill 300ms ease-in 200ms;
    }

    .circle2 {
      fill: ${(props) => props.theme.colors.background};
    }
    .circle3 {
      fill: ${(props) => props.theme.colors.main};
      transition: fill 300ms ease-out;
    }
  }
`
const Path = styled.path`
  fill: ${(props) => props.theme.colors.main};
`
const Circle = styled.circle`
  fill: ${(props) => props.theme.colors.main};
  stroke: ${(props) => props.theme.colors.main};
  transition: fill 300ms ease-in-out 100ms;
`
const HollowCircle = styled.circle`
  fill: ${(props) => props.theme.colors.background};
  stroke: ${(props) => props.theme.colors.main};

  &.circle1 {
    transition: fill 300ms ease-out;
  }
  &.circle3 {
    transition: fill 300ms ease-in 200ms;
  }
`
export default function Logo(props) {
  return (
    <Wrapper to='/' className={props.className}>
      <svg
        width='985'
        height='333'
        viewBox='0 0 985 333'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>Impact CO2</title>
        <Path d='M401.497 141.53H432.639V19H401.497V141.53Z' />
        <Path d='M460.993 141.53H488.811V86.5666C490.735 83.5908 494.234 75.8889 502.982 75.8889C510.855 75.8889 514.879 81.3153 514.879 89.1922V141.53H542.871V87.9669C542.871 87.0917 542.871 86.3915 542.871 85.6914L543.046 85.8664C544.446 83.5908 547.945 75.8889 556.693 75.8889C564.565 75.8889 568.589 81.3153 568.589 89.1922V141.53H596.582V87.9669C596.582 62.4106 581.886 49.8075 564.215 49.8075C550.919 49.8075 542.696 56.6342 536.748 63.811C530.8 54.5337 521.177 49.8075 510.505 49.8075C501.058 49.8075 494.059 53.3084 488.811 57.8595V53.3084H460.993V141.53Z' />
        <Path d='M618.519 184.591H646.337V137.504C652.635 142.405 660.508 145.031 670.83 145.031C698.997 145.031 715.268 123.151 715.268 97.4192C715.268 71.6879 698.997 49.8075 670.83 49.8075C660.508 49.8075 652.635 52.4332 646.337 57.3344V53.3084H618.519V184.591ZM646.512 107.922L646.337 108.097V86.7416L646.512 86.9166C651.76 79.7399 657.884 75.8889 666.806 75.8889C679.053 75.8889 686.576 84.466 686.576 97.4192C686.576 110.372 679.053 118.949 666.806 118.949C657.884 118.949 651.76 115.099 646.512 107.922Z' />
        <Path d='M756.154 145.031C765.426 145.031 775.049 140.83 779.947 135.053V141.53H807.94V85.8664C807.94 66.6117 794.993 49.8075 767.001 49.8075C750.555 49.8075 737.084 56.4592 729.036 67.6619L749.33 83.0657C752.655 76.9392 758.778 73.7884 766.126 73.7884C774.174 73.7884 779.597 78.8647 779.947 85.5163L755.454 89.7173C736.209 93.0431 725.887 103.546 725.887 117.199C725.887 134.528 738.308 145.031 756.154 145.031ZM753.179 115.799C753.179 111.773 755.629 109.322 762.977 108.097L779.947 105.296V113.173C776.448 118.599 771.025 122.975 762.277 122.975C756.853 122.975 753.179 120.175 753.179 115.799Z' />
        <Path d='M873.777 118.949C861.88 118.949 853.482 110.547 853.482 97.4192C853.482 84.466 861.88 75.8889 873.252 75.8889C880.775 75.8889 886.023 79.5648 889.172 84.291L911.216 67.4869C902.994 56.6342 889.872 49.8075 873.602 49.8075C842.46 49.8075 824.615 71.6879 824.615 97.4192C824.615 123.151 842.46 145.031 873.602 145.031C889.872 145.031 902.994 138.204 911.216 127.352L889.172 110.547C886.023 115.274 880.6 118.949 873.777 118.949Z' />
        <Path d='M932.689 107.222C932.689 128.927 942.661 143.28 966.63 143.28C974.853 143.28 980.276 142.23 985 140.13V116.149C982.376 117.199 978.177 118.074 971.704 118.074C964.356 118.074 960.682 114.223 960.682 107.222V78.5146H984.825V53.3084H960.682V31.253H932.689V53.3084H916.244V78.5146H932.689V107.222Z' />
        <Path d='M456.607 284.715C437.013 284.715 423.016 269.836 423.016 249.181C423.016 228.701 437.013 213.648 456.607 213.648C468.854 213.648 478.126 219.599 483.9 228.001L508.568 209.097C497.196 194.218 479.001 184.416 456.607 184.416C417.593 184.416 391 214.173 391 249.181C391 284.19 417.593 313.947 456.607 313.947C479.001 313.947 497.196 304.145 508.568 289.091L483.9 270.362C478.126 278.764 468.679 284.715 456.607 284.715Z' />
        <Path d='M583.721 184.416C544.707 184.416 518.114 214.173 518.114 249.181C518.114 284.19 544.707 313.947 583.721 313.947C622.561 313.947 649.154 284.19 649.154 249.181C649.154 214.173 622.561 184.416 583.721 184.416ZM583.721 284.715C564.127 284.715 550.13 269.836 550.13 249.181C550.13 228.701 564.127 213.648 583.721 213.648C603.141 213.648 617.137 228.526 617.137 249.181C617.137 269.661 603.141 284.715 583.721 284.715Z' />
        <Path d='M664.577 314H716.642V298.036H686.411L702.051 283.438C708.035 277.871 714.753 269.994 714.753 259.912C714.753 246.784 704.151 238.381 690.819 238.381C676.963 238.381 667.306 245.418 660.903 255.921L675.179 264.743C678.853 258.651 682.527 254.135 689.035 254.135C693.549 254.135 696.803 256.971 696.803 261.802C696.803 266.528 693.444 270.414 689.875 273.775L664.577 298.036V314Z' />
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M319.125 13.875H13.875V319.125H319.125V13.875ZM0 0V333H333V0H0Z'
        />
        <mask
          id='mask0_1984_4265'
          maskUnits='userSpaceOnUse'
          x='13'
          y='13'
          width='307'
          height='307'
        >
          <path
            d='M13.875 13.8738H319.125V319.124H13.875V13.8738Z'
            fill='#fff'
          />
        </mask>
        <g mask='url(#mask0_1984_4265)'>
          <HollowCircle
            className='circle1'
            cx='282.137'
            cy='281.137'
            r='81.1898'
            transform='rotate(-45 282.137 281.137)'
            strokeWidth='25'
          />
          <Circle
            className='circle2'
            cx='167.317'
            cy='166.317'
            r='81.1898'
            transform='rotate(-45 167.317 166.317)'
            strokeWidth='25'
          />{' '}
          <HollowCircle
            className='circle3'
            cx='52.4974'
            cy='51.4973'
            r='81.1898'
            transform='rotate(-45 52.4974 51.4973)'
            strokeWidth='25'
          />
        </g>
      </svg>
    </Wrapper>
  )
}
