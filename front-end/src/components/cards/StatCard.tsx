import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

export const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card
    elevation={2}
    sx={{
      borderRadius: 3,
      minWidth: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}
  >
    <CardContent sx={{ p: 0 }}>
      <Box display="flex" alignItems="center" gap={2}>
        {icon && <Box fontSize="2rem">{icon}</Box>}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
