
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  title: string;
  value: string;
};

export const StatCard = ({ title, value }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        p: 8,
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 0 4px rgba(255,255,255,0.05)'
            : '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: 'inherit', fontWeight: 600, mb: 1 }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: 'inherit', fontWeight: 700 }}
      >
        {value}
      </Typography>
    </Box>
  );
};