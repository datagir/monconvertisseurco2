import React from 'react'
import CheckboxInput from 'components/form/CheckboxInput'
import Input from 'components/form/Input'
import { Container, InputContainer, InputSuffix, Inputs, StyledInput } from './CustomParam.styles'

const configs: Record<string, { label: string; type: 'number' | 'text'; unit: string; min?: number; max?: number }> = {
  m2: { label: 'Afficher une surface personnalisée', type: 'number', unit: 'm²', min: 1 },
  km: { label: 'Afficher une distance personnalisée', type: 'number', unit: 'km', min: 1 },
}

const addressConfigs: Record<string, { label: string; start: string; end: string }> = {
  itineraire: { label: "Personnaliser l'itinéraire", start: 'Départ', end: 'Arrivée' },
  teletravail: { label: 'Personnaliser les adresses', start: 'Domicile', end: 'Bureau' },
}

export type CustomParamValue = string | { start: string; end: string }
export type CustomParamType = { value: CustomParamValue; visible: boolean }

const CustomParam = ({
  slug,
  value,
  visible,
  setValue,
  setVisible,
}: {
  slug: string
  value: CustomParamValue
  visible: boolean
  setValue: (value: CustomParamValue) => void
  setVisible: (visbile: boolean) => void
}) => {
  if (typeof value === 'string') {
    const config = configs[slug]
    return (
      <Container>
        <CheckboxInput
          checked={visible}
          setChecked={setVisible}
          label={config.label}
          data-testid={`custom-param-${slug}-checkbox`}
        />
        <InputContainer>
          <StyledInput
            id={slug}
            disabled={!visible}
            type={config.type}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            min={config.min}
            max={config.max}
            color='secondary'
            maxWidth='100px'
            data-testid={`custom-param-${slug}-input`}
          />
          <InputSuffix $disabled={!visible}>{config.unit}</InputSuffix>
        </InputContainer>
      </Container>
    )
  }
  const config = addressConfigs[slug]

  return (
    <Container>
      <CheckboxInput checked={visible} setChecked={setVisible} label={config.label} />
      <Inputs>
        <Input
          id={`${slug}-start`}
          value={value.start}
          label={config.start}
          required
          disabled={!visible}
          color='secondary'
          onChange={(e) => setValue({ ...value, start: e.target.value })}
        />
        <Input
          id={`${slug}-end`}
          value={value.end}
          label={config.end}
          required
          disabled={!visible}
          color='secondary'
          onChange={(e) => setValue({ ...value, end: e.target.value })}
        />
      </Inputs>
    </Container>
  )
}

export default CustomParam
