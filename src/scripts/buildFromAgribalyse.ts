import axios from 'axios'
import fs from 'fs'
import boissons from '../data/categories/boisson.json'
import fruitsetlegumes from '../data/categories/fruitsetlegumes.json'
import { BoissonEquivalent, EquivalentValue, FruitsEtLegumesEquivalent } from '../../types/equivalent'

enum AgrybalisePrefixEnum {
  ChangementClimatique = 'Changement_climatique_-_',
  ScoreUniqueEF = 'Score_unique_EF_-_',
}

const existingEquivalentsByCategory: Record<
  string,
  { file: string; values: (BoissonEquivalent | FruitsEtLegumesEquivalent)[] }
> = {
  boissons: { file: 'boisson.json', values: boissons },
  fruitsetlegumes: { file: 'fruitsetlegumes.json', values: fruitsetlegumes },
}

const finalitiesId: Record<string, number> = {
  Agriculture: 30,
  Transformation: 31,
  Emballage: 32,
  Transport: 33,
  Supermarché_et_distribution: 34,
  Consommation: 35,
}

const agrybaliseValues = [
  'Code_CIQUAL',
  'Code_AGB',
  "Sous-groupe_d'aliment",
  ...Object.keys(finalitiesId).flatMap((finality) => [
    AgrybalisePrefixEnum.ChangementClimatique + finality,
    AgrybalisePrefixEnum.ScoreUniqueEF + finality,
  ]),
]

function sumValues(prefix: AgrybalisePrefixEnum, value: Record<string, number>) {
  let res = 0
  Object.keys(finalitiesId).forEach((finality) => {
    res += value[`${prefix}${finality}`]
  })
  return res
}

const updateEquivalents = (
  equivalents: (BoissonEquivalent | FruitsEtLegumesEquivalent)[],
  values: (Record<string, number> & { Code_CIQUAL: number; Code_AGB?: string; "Sous-groupe_d'aliment": string })[]
) => {
  return equivalents.map((equivalent) => {
    if (!('Code_CIQUAL' in equivalent)) {
      return equivalent
    }

    let value = values[0]
    const agbValue = values.find((v) => v.Code_AGB === equivalent.Code_AGB)
    if (agbValue) {
      value = agbValue
    } else {
      const ciqualValues = values.filter((v) => v.Code_CIQUAL === equivalent.Code_CIQUAL)
      if (ciqualValues.length === 1) {
        value = ciqualValues[0]
      } else if (ciqualValues.length === 0) {
        throw new Error('BUG! ' + equivalent.slug + ' is not defined...')
      } else {
        throw new Error(
          'BUG! ' + equivalent.slug + ' has too much possible values, should use a Code_AGB to discriminate'
        )
      }
    }
    console.log(`${equivalent.slug}: "${value["Sous-groupe_d'aliment"]}",`)

    const finalC02 = sumValues(AgrybalisePrefixEnum.ChangementClimatique, value)
    const finalEF = sumValues(AgrybalisePrefixEnum.ScoreUniqueEF, value)
    const delta = finalC02 / finalEF

    const newEcvs: EquivalentValue[] = []
    Object.entries(finalitiesId).forEach(([finality, id]) => {
      const ecv = value[`${AgrybalisePrefixEnum.ScoreUniqueEF}${finality}`] * delta
      if (ecv !== 0) {
        newEcvs.push({
          id,
          value: ecv,
        })
      }
    })
    return {
      ...equivalent,
      ecv: newEcvs,
    }
  })
}

const buildFromAgribalyse = async (key: string) => {
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents) {
    console.info('Type should be "boissons" or "fruitsetlegumes"')
    process.exit(1)
  }

  const ciquals = existingEquivalents.values
    .map((equivalent) => ('Code_CIQUAL' in equivalent ? equivalent.Code_CIQUAL : ''))
    .filter((code) => !!code)
    .join(',')
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=${
      ciquals.length
    }&select=${agrybaliseValues.join(',')}&Code_CIQUAL_in=${ciquals}`
  )

  const newEquivalents = await axios.get(remote_url).then((response) => response.data.results)
  const finalResult = updateEquivalents(existingEquivalents.values, newEquivalents)
  fs.writeFileSync(`src/data/categories/${existingEquivalents.file}`, JSON.stringify(finalResult, null, 2))
}

if (process.argv[2]) {
  buildFromAgribalyse(process.argv[2])
} else {
  buildFromAgribalyse('boissons')
  buildFromAgribalyse('fruitsetlegumes')
}
