import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  title: string;
  value: string;
};

export const StatCard = ({ title, value }: Props) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const getBackgroundColor = () => {
    const t = title.toLowerCase();

    if (t === 'levels') return mode === 'dark' ? '#423C83' : '#FFE2B8';
    if (t === 'coins') return mode === 'dark' ? '#3f2180' : '#6ED1D1';
    return mode === 'dark' ? '#1E2A3A' : '#ffffff';
  };

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(),
        color: mode === 'dark' ? '#E3F2FD' : '#2C2C3E',
        borderRadius: '24px',
        px: 4,
        py: 3,
        minHeight: 100,
        width: 180,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow:
          mode === 'dark'
            ? '0 0 4px rgba(255,255,255,0.05)'
            : '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: '28px',
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
