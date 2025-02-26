import { ReactNode } from 'react'

type BaseEquivalent = {
  id?: string | number
  slug: string
  category: number
  default?: boolean
  synonyms?: string[]
  withCarpool?: boolean
  carpool?: number
  livraison?: boolean
  percentage?: boolean
  unit?: string
  sources?: {
    label: string
    href: string
  }[]
}

type BaseEquivalentValue =
  | {
      total: number
    }
  | { ecv: EquivalentValue[] }

export type ChauffageEquivalent = BaseEquivalent & {
  total: number
}

export type RepasEquivalent = BaseEquivalent & {
  total: number
}

export type UsageNumeriqueEquivalent = BaseEquivalent & {
  ecv: EquivalentValue[]
}

export type DeplacementType = 'car' | 'foot' | 'rail' | 'plane'
export type DeplacementEquivalent = BaseEquivalent & {
  id: number
  type: string
  total?: number
  ecv?: EquivalentValue[]
  ecvs?: {
    display?: {
      min?: number
      max?: number
    }
    subtitle: string
    ecv: EquivalentValue[]
  }[]
  display?: {
    min?: number
    max?: number
  }
}

export type BoissonEquivalent = BaseEquivalent &
  (
    | {
        Code_CIQUAL?: number
        Code_AGB?: string
        Code_CIQUALs?: number[]
        ecv?: EquivalentValue[]
      }
    | {
        total: number
      }
  )

export type FruitsEtLegumesEquivalent = BoissonEquivalent & {
  months: number[]
}

export type UsableEquivalent = BaseEquivalent & { ids?: number[] } & (
    | {
        ecv: EquivalentValue[]
        usage?: {
          peryear: number
          defaultyears: number
        }
        end?: number
      }
    | { total: number }
  )
export type EquivalentValue = { value: number; id: number }

export type Equivalent =
  | BoissonEquivalent
  | ChauffageEquivalent
  | DeplacementEquivalent
  | UsableEquivalent
  | RepasEquivalent
  | UsageNumeriqueEquivalent
  | FruitsEtLegumesEquivalent

export type ComputedEquivalent = Equivalent & { value: number; initialValue?: number; link: string; name?: ReactNode }

export type Language = 'en' | 'fr' | 'es'
export type SimpleEquivalent = {
  percentage?: boolean
  value: number
  category: number
} & Record<Language, string>
