import { XpProgressBar } from '@components/XpProgressBar/XpProgressBar';
import BlobImg from '@assets/blob.png';
import HatBlack from '@assets/hats/black_hat.png'
import HatBlue from '@assets/hats/blue_hat.png';
import HatBrown from '@assets/hats/brown_hat.png';
import HatMagic from '@assets/hats/magic_hat.png';

import { useUserXp } from '@hooks/useUserXp';
import { useCompanionHatStore } from '@features/companion/hatStore';
import clsx from 'clsx';
import styles from './CompanionCard.module.css';

interface CompanionCardProps {
  xpMax: number;
  className?: string;
}

const hatImages: Record<string, string> = {
  black: HatBlack,
  blue: HatBlue,
  brown: HatBrown,
  magic: HatMagic,
};

export const CompanionCard = ({ xpMax, className }: CompanionCardProps) => {
  const xp = useUserXp();
  const hat = useCompanionHatStore((state) => state.hat);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.floatingGroup}>
        {hat !== 'none' && hatImages[hat] && (
          <img
            src={hatImages[hat]}
            alt={`${hat} hat`}
            className={clsx(styles.image, styles.hat)}
          />
        )}
        <img src={BlobImg} alt="Companion" className={styles.image} />
      </div>

      <div className={styles.progressContainer}>
        <XpProgressBar xp={xp} xpMax={xpMax} />
      </div>
    </div>
  );
};
