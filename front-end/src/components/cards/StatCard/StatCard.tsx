import { Card, CardContent, Box } from '@mui/material';
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
          <p className={styles.title}>{title}</p>
          <h2 className={styles.value}>{value}</h2>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
