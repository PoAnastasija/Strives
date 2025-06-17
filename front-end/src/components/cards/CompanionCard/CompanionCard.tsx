import { XpProgressBar } from '@components/XpProgressBar/XpProgressBar';
import BlobImg from '@assets/blob.png';
import styles from './CompanionCard.module.css';
import { useUserXp } from '@hooks/useUserXp';
import clsx from 'clsx';

interface CompanionCardProps {
  xpMax: number;
  className?: string;
}

export const CompanionCard = ({ xpMax, className }: CompanionCardProps) => {
  const xp = useUserXp();

  return (
    <div className={clsx(styles.wrapper, className)}>
      <img src={BlobImg} alt="Companion" className={styles.image} />
      <div className={styles.progressContainer}>
        <XpProgressBar xp={xp} xpMax={xpMax} />
      </div>
    </div>
  );
};
