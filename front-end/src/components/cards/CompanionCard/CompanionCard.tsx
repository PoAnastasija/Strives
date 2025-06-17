import { XpProgressBar } from '@components/XpProgressBar/XpProgressBar';
import BlobImg from '@assets/blob.png';
import styles from './CompanionCard.module.css';
import { useUserXp } from '@hooks/useUserXp';

interface CompanionCardProps {
  xpMax: number;
}

export const CompanionCard = ({ xpMax }: CompanionCardProps) => {
  const xp = useUserXp();

  return (
    <div className={styles.wrapper}>
      <img src={BlobImg} alt="Companion" className={styles.image} />
      <div className={styles.progressContainer}>
        <XpProgressBar xp={xp} xpMax={xpMax} />
      </div>
    </div>
  );
};
