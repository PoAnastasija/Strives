import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';

type RewardCardProps = {
  title: string;
  cost: number;
  onClaim: () => void;
  disabled?: boolean;
};

export const RewardCard = ({ title, cost, onClaim, disabled }: RewardCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        minHeight: 100,
        minWidth: 200,
        backgroundColor: disabled ? 'grey.100' : 'background.paper',
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
          <RedeemIcon
            fontSize="large"
            sx={{ fontSize: 40, color: disabled ? 'text.disabled' : 'primary.main' }}
          />
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Coût : {cost} 🪙
          </Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={onClaim}
            disabled={disabled}
            sx={{ textTransform: 'none', mt: 1 }}
          >
            Réclamer
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
