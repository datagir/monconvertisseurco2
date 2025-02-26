import { useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenComparateurEtiquettesValues } from 'components/shareable/overScreens/Values'
import EtiquetteSimulator from './EtiquetteSimulator'
import styles from './Etiquettes.module.css'

const Etiquettes = () => {
  const overScreens = useMemo(() => overScreenComparateurEtiquettesValues(), [])

  return (
    <div className={styles.etiquettes}>
      <Shareable
        slug='etiquette-animee'
        tracking='Étiquette animée'
        overScreens={overScreens.animated}
        secondary='Étiquette animée'
        withoutShare>
        <EtiquetteSimulator animated />
      </Shareable>
      <Shareable
        slug='etiquette-statique'
        tracking='Étiquette statique'
        overScreens={overScreens.static}
        secondary='Étiquette statique'
        withoutShare>
        <EtiquetteSimulator />
      </Shareable>
    </div>
  )
}

export default Etiquettes
