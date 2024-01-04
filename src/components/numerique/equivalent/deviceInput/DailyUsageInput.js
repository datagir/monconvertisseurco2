import Slider from 'components/base/Slider'
import useRulesContextNumerique from 'components/numerique/RulesProviderNumerique'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DailyUsageInput(props) {
  const { engine, setSituation } = useRulesContextNumerique()

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Durée d'utilisation quotidienne</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue}
          min={1}
          max={20}
          step={0.5}
          onChange={(value) =>
            setSituation({
              [`${props.device.name} . profil utilisation`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {Math.floor(engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue)}h
          {Math.round((engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue * 60) % 60)}
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
