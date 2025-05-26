import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card elevation={2} className={styles.card}>
    <CardContent className={styles.content}>
      <Box className={styles.inner}>
        {icon && <Box className={styles.icon}>{icon}</Box>}
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
