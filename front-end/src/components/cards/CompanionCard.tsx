import { XpProgressBar } from '@components/layout/XpProgressBar';
import monsterImg from '@assets/man.png';
import styles from './CompanionCard.module.css';

interface CompanionCardProps {
  xp: number;
  xpMax: number;
}

export const CompanionCard = ({ xp, xpMax }: CompanionCardProps) => {
  return (
    <div className={styles.card}>
      <img src={monsterImg} alt="Ton compagnon" className={styles.image} />
      <XpProgressBar xp={xp} xpMax={xpMax} />
    </div>
  );
};
