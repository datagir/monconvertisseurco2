import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import values from './values.json'

const m2: Record<string, string> = {
  fr: 'par m²',
  en: 'per m²',
  es: 'por m²',
}

const carpooling: Record<string, Record<string, string>> = {
  voiturethermique: {
    fr: 'Covoiturage thermique',
    en: 'Carpooling combustion',
    es: 'Compartir coche termico',
  },
  voitureelectrique: {
    fr: 'Covoiturage électrique',
    en: 'Carpooling electric',
    es: 'Compartir coche eléctrico',
  },
}

const passengers: Record<string, string> = {
  fr: 'passager[s]',
  en: 'passenger[s]',
  es: 'pasajero[s]',
}

const allValues: Record<string, { fr: string; en: string; es: string }> = {
  ...values,
  avion: {
    fr: 'avion',
    en: 'plane',
    es: 'avión',
  },
}

const getValues = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>
): { prefix: string; name: string } => {
  const [ref] = equivalent.slug.split('+')
  const value = allValues[ref]

  if (!value) {
    return { prefix: '', name: '' }
  }

  //@ts-expect-error: expect translation
  const translation = value[language]
  if (translation.includes('=')) {
    const [name, prefix] = translation.split('=')
    return {
      prefix,
      name: equivalent.carpool ? `${carpooling[ref][language]} ` : name,
    }
  }

  if (translation.includes(';')) {
    const [prefix, name] = translation.split(';')
    return {
      prefix,
      name: equivalent.carpool ? `${carpooling[ref][language]} ` : name,
    }
  }

  return {
    prefix: '',
    name: equivalent.carpool ? `${carpooling[ref][language]} ` : translation,
  }
}

export const getPrefix = (language: string, equivalent: Pick<Equivalent, 'category' | 'slug'>, value?: number) => {
  const { prefix } = getValues(language, equivalent)
  return prefix ? formatName(prefix, value || 1) : ''
}

export const getNameWithoutSuffix = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number,
  lowerCase?: boolean
) => {
  const { prefix, name } = getValues(language, equivalent)
  const formattedName = formatName(name, value || 1)
  const nameWithoutSuffix = `${withPrefix ? formatName(prefix, value || 1) : ''}${formattedName[0].toLowerCase()}${formattedName.slice(1)}`
  if (lowerCase) {
    return `${nameWithoutSuffix[0].toLowerCase()}${nameWithoutSuffix.slice(1)}`
      .replace(/\brer\b/i, 'RER')
      .replace(/\btgv\b/i, 'TGV')
      .replace(/\bter\b/i, 'TER')
      .replace(/\bgame of\b/i, 'Game of')
      .replace(/a\/r/i, 'A/R')
      .replace(/\bclick\b/i, 'Click')
  } else {
    return `${nameWithoutSuffix[0].toUpperCase()}${nameWithoutSuffix.slice(1)}`
  }
}

export const getName = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number,
  lowerCase?: boolean
) => {
  const name = getNameWithoutSuffix(language, equivalent, withPrefix, value, lowerCase)
  return `${name}${equivalent.category === 8 ? ` ${m2[language]}` : ''}${equivalent.carpool ? `(${equivalent.carpool} ${formatName(passengers[language], equivalent.carpool)})` : ''}`
}

export const isEquivalentInMode = (equivalent: ComputedEquivalent, mode: string) =>
  mode === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === mode

export const getComparisonSlug = (slug: string) =>
  slug.startsWith('avion-') && slug.endsWith('courrier') ? 'avion' : slug
