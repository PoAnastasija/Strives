import { Box, Button, Grid, Paper, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BlobBase from '@assets/blob.png';
import HatBlack from '@assets/black_hat.png';
import HatBlue from '@assets/blue_hat.png';
import HatBrown from '@assets/brown_hat.png';

import { useCompanionHatStore } from '@features/companion/hatStore';
import styles from './DressingRoom.module.css';

type HatOption = 'none' | 'black' | 'blue' | 'brown';

const hatImages: Record<HatOption, string | null> = {
  none: null,
  black: HatBlack,
  blue: HatBlue,
  brown: HatBrown,
};

// Niveau du joueur (voir pour le lier avec les levels du user)
const playerLevel = 7;

const isHatUnlocked = (hat: HatOption, level: number) => {
  if (hat === 'brown') return level >= 10;
  if (hat === 'blue') return level >= 5;
  return true;
};

export default function DressingRoomPage() {
  const [selectedHat, setSelectedHat] = useState<HatOption>('none');
  const setHat = useCompanionHatStore((state) => state.setHat);
  const navigate = useNavigate();

  const handleApply = () => {
    setHat(selectedHat);
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'var(--bg-dashboard)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
        textAlign: 'center',
      }}
    >
      <Box textAlign="left" mb={2}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          ← Return home
        </Button>
      </Box>

      <h1>Dressing Room</h1>
      <p>Customize your Blob Companion with accessories.</p>

      <Box className={styles.wrapper}>
        <Box className={styles.floatingGroup}>
          {selectedHat !== 'none' && (
            <img
              src={hatImages[selectedHat]!}
              alt="Hat"
              className={`${styles.image} ${styles.hat}`}
            />
          )}
          <img
            src={BlobBase}
            alt="Blob Companion"
            className={styles.image}
            style={{ top: 50, zIndex: 1 }}
          />
        </Box>
      </Box>

      <h2>Choose a Hat</h2>
      <Grid container spacing={2} justifyContent="center">
        {(['none', 'black', 'blue', 'brown'] as HatOption[]).map((option) => {
          const unlocked = isHatUnlocked(option, playerLevel);
          const tooltip =
            option === 'blue' && !unlocked
              ? 'Reach level 5 to unlock this hat'
              : option === 'brown' && !unlocked
              ? 'Reach level 10 to unlock this hat'
              : '';

          return (
            <Grid item key={option}>
              <Tooltip title={tooltip}>
                <Paper
                  elevation={selectedHat === option ? 6 : 1}
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    border: selectedHat === option ? '2px solid #7b61ff' : '2px solid transparent',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    opacity: unlocked ? 1 : 0.4,
                  }}
                  onClick={() => unlocked && setSelectedHat(option)}
                >
                  {option === 'none' ? (
                    <Box
                      width={80}
                      height={80}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: '#eee', borderRadius: 2 }}
                    >
                      <span style={{ fontSize: '0.8rem', color: '#999' }}>No Hat</span>
                    </Box>
                  ) : (
                    <img
                      src={hatImages[option]!}
                      alt={`${option} hat`}
                      style={{ width: 80, height: 80 }}
                    />
                  )}
                </Paper>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      <Box mt={4}>
        <Button
          variant="contained"
          onClick={handleApply}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}
