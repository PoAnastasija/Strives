import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

export const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card elevation={2} sx={{ borderRadius: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        {icon && <Box>{icon}</Box>}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
          <Typography variant="h6">{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
