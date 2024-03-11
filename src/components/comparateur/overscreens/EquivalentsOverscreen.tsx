import React, { useState } from 'react'
import categories from 'data/categories.json'
import useParamContext from 'components/providers/ParamProvider'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import Button from 'components/base/buttons/Button'
import { HiddenLabel } from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Category from './Category'
import Equivalents from './Equivalents'
import styles from './EquivalentsOverscreen.module.css'

const EquivalentsOverscreen = ({ onClose }: { onClose: () => void }) => {
  const {
    comparateur: { equivalents },
  } = useParamContext()

  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search)

  return (
    <>
      <div className={styles.header}>
        <HiddenLabel htmlFor='input-search'>Rechercher un objet, un geste..</HiddenLabel>
        <Input
          id='search'
          background='white'
          maxWidth='100%'
          placeholder='Rechercher un objet, un geste...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.content}>
        {search ? (
          results.length > 0 ? (
            <Equivalents equivalentsToDisplay={results} />
          ) : (
            <>
              Oups ! Nous n'avons trouvé aucun résultat correspondant à votre recherche. Veuillez réessayer avec des
              termes différents.
            </>
          )
        ) : (
          categories
            .filter((category) => category.id !== 12 && category.id !== 11)
            .map((category) => <Category category={category} key={category.slug} onClose={onClose} />)
        )}
      </div>
      <div className={styles.footer}>
        <div>
          <span className={styles.equivalentsNumber} data-testid='selected-equivalents-number'>
            {equivalents.length}
          </span>
          <span className={styles.equivalentsInfo}> / 8 équivalents</span>
        </div>
        <div>
          <Button onClick={onClose}>Valider la séléction</Button>
        </div>
        <div />
      </div>
    </>
  )
}

export default EquivalentsOverscreen
