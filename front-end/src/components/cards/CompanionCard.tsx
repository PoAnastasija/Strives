import { XpProgressBar } from '../layout/XpProgressBar';
import monsterImg from '../../assets/man.png';
import { Paper, Box } from '@mui/material';


type Props = {
  xp: number;
  xpMax: number;
};

export const CompanionCard = ({ xp, xpMax }: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 280,
      }}
    >
      <Box
        component="img"
        src={monsterImg}
        alt="Ton compagnon"
        sx={{ width: 120, height: 120, mb: 2 }}
      />
      <XpProgressBar xp={xp} xpMax={xpMax} />
    </Paper>
  );
};
