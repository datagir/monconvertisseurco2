import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import formatConstruction from 'utils/formatConstruction'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import useDataContext from 'components/providers/DataProvider'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'
import useRulesContextNumerique, { evaluateNumber } from 'components/numerique/RulesProviderNumerique'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  padding: 1.5rem;
`
const Title = styled.h3`
  text-align: center;
`

const Text = styled.p`
  font-size: 0.875rem;
  margin: 0 auto 0.5rem;
  max-width: 29rem;
  text-align: center;
`

const devices = [
  {
    name: 'smartphone',
    slug: 'smartphone',
  },
  {
    name: 'tablette',
    slug: 'tabletteclassique',
  },
  {
    name: 'ordinateur portable',
    slug: 'ordinateurportable',
  },
  {
    name: 'ordinateur et écran',
    slug: 'ordinateurfixe',
  },
  {
    name: 'TV',
    slug: 'television',
  },
]

export default function Detail({ category }: { category: Category }) {
  const { engine, situation, numberEmails } = useRulesContextNumerique()
  const { equivalents } = useDataContext()

  const [displayAll, setDisplayAll] = useState(false)

  const equivalentsOfCategory = useMemo(() => {
    const devicesToDisplay = (
      displayAll
        ? devices
        : devices.filter(
            ({ name }) =>
              (name === engine.evaluate('email . appareil').nodeValue && numberEmails) ||
              (name === engine.evaluate('streaming . appareil').nodeValue &&
                engine.evaluate('streaming . durée').nodeValue) ||
              (name === engine.evaluate('visio . appareil').nodeValue && engine.evaluate('visio . durée').nodeValue)
          )
    ).map((device) => device.slug)

    return [
      {
        id: 'email',
        slug: 'email',
        title: `1 an d'emails (${formatNumber(numberEmails * 52)} emails)`,
        emoji: '📧',
        color: '#6C8CC1',
        value:
          ((evaluateNumber(engine, 'email') - evaluateNumber(engine, 'email . terminaux . construction')) *
            numberEmails *
            52) /
          1000,
        onClick: () => track('Usage numérique', 'Navigation equivalent', 'email'),
      },
      {
        id: 'visioconference',
        slug: 'visioconference',
        title: `1 an de visioconférence (${formatNumber((evaluateNumber(engine, 'visio . durée') / 60) * 52)} heures)`,
        emoji: '🎥',
        color: '#3DC7AB',
        value:
          (((evaluateNumber(engine, 'visio . durée') ? evaluateNumber(engine, 'visio') : 0) -
            evaluateNumber(engine, 'visio . terminaux . construction')) *
            52) /
          1000,
        onClick: () => track('Usage numérique', 'Navigation equivalent', 'visioconference'),
      },
      {
        id: 'streaming',
        slug: 'streamingvideo',
        title: `1 an de streaming (${formatNumber((evaluateNumber(engine, 'streaming . durée') / 60) * 52)} heures)`,
        emoji: '🎬',
        color: '#C25166',
        value:
          (((evaluateNumber(engine, 'streaming . durée') ? evaluateNumber(engine, 'streaming') : 0) -
            evaluateNumber(engine, 'streaming . terminaux . construction')) *
            52) /
          1000,
        onClick: () => track('Usage numérique', 'Navigation equivalent', 'streaming'),
      },
      ...equivalents
        .filter((equivalent) => devicesToDisplay.includes(equivalent.slug))
        .map((equivalent) => ({
          ...equivalent,
          id: equivalent.slug,
          title: `Construction d'un${
            ['tabletteclassique', 'television'].includes(equivalent.slug) ? 'e' : ''
          } ${formatName(equivalent.name, 1)}`,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: formatConstruction(equivalent),
          onClick: () => track('Usage numérique', 'Navigation equivalent', equivalent.slug),
        })),
    ].filter((item) => item.value)
    // Situation is needed here because engine is not properly updated
  }, [engine, numberEmails, equivalents, displayAll, situation])

  return (
    <Wrapper>
      <Title>Détail de mon impact</Title>
      <Text>
        En général, la majorité de votre empreinte numérique provient de la construction de vos appareils et pas de
        l’usage de ces derniers.
      </Text>
      <Top className='noscreenshot'>
        <Checkboxes $visible>
          <Checkbox
            name='displayAll'
            checked={displayAll}
            onChange={() => {
              track('Usage numérique', 'Voir tous', displayAll ? 'faux' : 'vrai')
              setDisplayAll((prevDisplayAll) => !prevDisplayAll)
            }}>
            Voir tous les appareils
          </Checkbox>
        </Checkboxes>
      </Top>
      <BarChart equivalents={equivalentsOfCategory} category={category} />
      <Instruction />
    </Wrapper>
  )
}
