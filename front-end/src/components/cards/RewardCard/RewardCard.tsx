import { Card, CardContent, Box, Button, useTheme, Typography, Link } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';

interface RewardCardProps {
  title: string;
  cost: number;
  link?: string;
  onClaim: () => void;
  disabled?: boolean;
}

export const RewardCard = ({ title, cost, link, onClaim, disabled }: RewardCardProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const backgroundColor = isDark ? '#a890ed' : '#FFF3B0';

  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor,
        borderRadius: '24px',
        padding: '24px',
        boxShadow: isDark
          ? '0 0 4px rgba(255,255,255,0.05)'
          : '0 4px 12px rgba(0,0,0,0.06)',
        textAlign: 'center',
        color: isDark ? '#E3F2FD' : '#2C2C3E',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <RedeemIcon
            fontSize="large"
            sx={{
              fontSize: 40,
              color: disabled ? (isDark ? '#666' : '#aaa') : '#7b61ff'
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Cost: {cost} 🪙
          </Typography>

          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ fontSize: '14px', color: isDark ? '#90CAF9' : '#3F51B5' }}
            >
              Link to reward 🔗
            </Link>
          )}

          <Button
            variant="contained"
            onClick={onClaim}
            disabled={disabled}
            sx={{
              backgroundColor: '#FFDC49',
              color: '#2C2C3E',
              fontWeight: 700,
              borderRadius: '999px',
              textTransform: 'none',
              padding: '6px 20px',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#f5c937',
              },
              '&:disabled': {
                backgroundColor: isDark ? '#2E3D4C' : '#f0e2a4',
                color: '#999',
              }
            }}
          >
            Claim
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
