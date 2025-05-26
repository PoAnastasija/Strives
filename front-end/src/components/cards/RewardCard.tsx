import { Card, CardContent, Box, Button } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import styles from './RewardCard.module.css';

type RewardCardProps = {
  title: string;
  cost: number;
  onClaim: () => void;
  disabled?: boolean;
};

export const RewardCard = ({ title, cost, onClaim, disabled }: RewardCardProps) => {
  const cardClass = `${styles.card} ${disabled ? styles.disabledCard : styles.enabledCard}`;

  return (
    <Card elevation={3} className={cardClass}>
      <CardContent className={styles.content}>
        <Box className={styles.contentBox}>
          <RedeemIcon
            fontSize="large"
            sx={{ fontSize: 40, color: disabled ? 'grey' : '#7b61ff' }}
          />
          <h2 className="rewardTitle">{title}</h2>
          <p className="rewardCost">Coût : {cost} 🪙</p>
          <Button
            variant="contained"
            size="medium"
            onClick={onClaim}
            disabled={disabled}
            className={styles.claimButton}
          >
            Réclamer
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
