import LivraisonCard from './LivraisonCard'
import styles from './LivraisonCards.module.css'

const LivraisonCards = () => {
  return (
    <ul className={styles.tools}>
      <LivraisonCard
        image={`/images/simulateur.svg`}
        title='Le simulateur'
        description='Comparer les scénarios d’achat d’une sélection de 10 objets et ajuster la distance parcourue.'
        linkLabel='Découvrir'
        link='#simulateur'
      />
      <LivraisonCard
        image={`/images/etiquettes.svg`}
        title='Les étiquettes'
        description='Proposer une lecture rapide des ordres de grandeur des différents scénarios d’achat.'
        linkLabel='Voir les étiquettes'
        link='#etiquettes'
      />
    </ul>
  )
}

export default LivraisonCards
