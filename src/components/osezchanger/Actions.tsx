import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import GhostButton from '../base/GhostButton'
import { Container } from './Actions.styles'
import { ModalType } from './modals/Modal'

const Actions = ({
  takeScreenshot,
  setModal,
}: {
  takeScreenshot: () => void
  setModal: Dispatch<SetStateAction<ModalType | undefined>>
}) => {
  return (
    <Container>
      <GhostButton
        colored
        size='sm'
        icon='send-plane'
        onClick={() => {
          track('OsezChanger', 'Partager', 'osez_changer_partager')
          setModal('share')
        }}>
        Partager
      </GhostButton>
      <GhostButton
        colored
        size='sm'
        icon='code-s-slash'
        onClick={() => {
          track('OsezChanger', 'Integrer', 'osez_changer_integrer')
          setModal('integration')
        }}>
        Intégrer
      </GhostButton>
      <GhostButton
        colored
        size='sm'
        icon='download'
        onClick={() => {
          track('OsezChanger', 'Telecharger', 'osez_changer_telecharger')
          takeScreenshot()
        }}>
        Télécharger
      </GhostButton>
    </Container>
  )
}

export default Actions
