import { XpProgressBar } from '@components/layout/XpProgressBar/XpProgressBar';
import monsterImg from '@assets/man.png';
import styles from './CompanionCard.module.css';
import { useUserXp } from '@hooks/useUserXp';

interface CompanionCardProps {
  xpMax: number;
}

export const CompanionCard = ({ xpMax }: CompanionCardProps) => {
      const xp = useUserXp();
  return (
    <div className={styles.card}>
      <img src={monsterImg} alt="Ton compagnon" className={styles.image} />
      <XpProgressBar xp={xp} xpMax={xpMax} />
    </div>
  );
};
