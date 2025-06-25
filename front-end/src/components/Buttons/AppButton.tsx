import { Button, ButtonProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface AppButtonProps extends ButtonProps {
  children: ReactNode;
  colorHex?: string;
}

export default function AppButton({
  children,
  colorHex,
  ...props
}: AppButtonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const defaultColor = colorHex || (isDark ? '#332b76' : '#8583eb');

  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        borderRadius: '25px',
        fontWeight: 'bold',
        fontSize: '1rem',
        px: 4,
        py: 1.2,
        color: '#fff',
        backgroundColor: defaultColor,
        boxShadow: `0 6px 20px ${isDark ? 'rgba(73, 63, 156, 0.4)' : 'rgba(133, 131, 235, 0.3)'}`,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: defaultColor,
          transform: 'translateY(-2px)',
          boxShadow: `0 10px 25px ${isDark ? 'rgba(51, 43, 118, 0.5)' : 'rgba(133, 131, 235, 0.4)'}`,
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}