'use client'

import { ReactNode, useMemo } from 'react'
import Block from 'components/layout/Block'
import Shareable from 'components/shareable/Shareable'
import { overScreenCategoryValues, overScreenOsezChangerValues } from 'components/shareable/overScreens/Values'
import styles from './ExtraSimulator.module.css'

const ExtraSimulator = ({
  children,
  simulator,
}: {
  children: ReactNode
  simulator: {
    slug: string
    tracking: string
    title: string
    description: string
    simulator: ReactNode
    small?: boolean
  }
}) => {
  const overScreens = useMemo(
    () =>
      simulator.slug === 'osez-changer'
        ? overScreenOsezChangerValues()
        : overScreenCategoryValues({ id: 2, unit: simulator.slug, slug: simulator.slug, name: simulator.tracking }),
    [simulator]
  )

  const component = (
    <Shareable slug={simulator.slug} tracking={simulator.tracking} overScreens={overScreens} small={simulator.small}>
      {children}
    </Shareable>
  )
  return (
    <Block id={simulator.slug} title={simulator.title} description={simulator.description}>
      {simulator.small ? <div className={styles.container}>{component}</div> : component}
    </Block>
  )
}

export default ExtraSimulator
