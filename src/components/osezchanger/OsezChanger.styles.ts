import styled from 'styled-components'
import Button from 'components/base/Button'

export const Screenshot = styled.div<{ $isScreenshotting: boolean }>`
  background-color: var(--secondary-10);
  ${({ $isScreenshotting }) =>
    $isScreenshotting &&
    `
      margin-right: -1rem;
      padding: 0 1rem 1rem 1rem;
  `}
`

export const Container = styled.div<{ $defiMode?: boolean }>`
  background-color: var(--secondary-10);
  border-radius: 8px;
  color: var(--natural-80);
  flex: 1 0 0;
  font-family: Marianne;
  height: fit-content;
  margin: 0 auto;
  max-width: 27.5rem;
  min-width: 19.5rem;
  padding: 1.5rem;
  position: relative;
  ${({ $defiMode }) => $defiMode && 'padding-bottom: 0.75rem;'}
`

export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
`

export const Description = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin-bottom: 8px;
`

export const DefiButton = styled(Button)`
  margin: auto;
`

export const Logos = styled.div`
  margin-top: 1.5rem;
`

export const BottomLogos = styled(Logos)`
  border-top: 1px solid var(--secondary-20);
  padding-top: 1.5rem;
`
