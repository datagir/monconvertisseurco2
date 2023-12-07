import React, { Dispatch, SetStateAction } from 'react'
import { Icon } from '../icons'
import { Container, Input, LeftButton, RightButton } from './NumberInput.styles'

const NumberInput = ({
  tracking,
  value,
  setValue,
  'data-testid': dataTestId,
}: {
  tracking: string
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  ['data-testid']?: string
}) => {
  return (
    <Container>
      <LeftButton
        aria-label='moins'
        disabled={value === 0}
        onClick={() => {
          if (value === undefined) {
            setValue(0)
          } else if (value > 0) {
            setValue(value - 1)
          }
        }}>
        <Icon iconId='minus' />
      </LeftButton>
      <Input
        data-testid={`${dataTestId}-input`}
        type='number'
        value={value === undefined ? '' : value}
        onChange={(e) => {
          const numberValue = Number.parseInt(e.target.value)
          if (Number.isNaN(numberValue)) {
            setValue(undefined)
          } else if (numberValue < 0) {
            setValue(0)
          } else {
            setValue(numberValue)
          }
        }}
        step={1}
        min={0}
        max={99}
      />
      <RightButton
        aria-label='plus'
        onClick={() => {
          if (value === undefined) {
            setValue(1)
          } else {
            setValue(value + 1)
          }
        }}>
        <Icon iconId='plus' />
      </RightButton>
    </Container>
  )
}

export default NumberInput
