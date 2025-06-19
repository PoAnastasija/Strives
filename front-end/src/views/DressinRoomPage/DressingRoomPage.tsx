import { Box, Button, Grid, Paper, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlobBase from '@assets/blob.png';
import HatBlack from '@assets/black_hat.png';
import HatBlue from '@assets/blue_hat.png';
import HatBrown from '@assets/brown_hat.png';
import styles from './DressingRoom.module.css';

type HatOption = 'none' | 'black' | 'blue' | 'brown';

const hatImages: Record<HatOption, string | null> = {
  none: null,
  black: HatBlack,
  blue: HatBlue,
  brown: HatBrown,
};

// Niveau du joueur (à connecter plus tard)
const playerLevel = 7;

const isHatUnlocked = (hat: HatOption, level: number) => {
  if (hat === 'brown') return level >= 10;
  if (hat === 'blue') return level >= 5;
  return true;
};

export default function DressingRoomPage() {
  const [selectedHat, setSelectedHat] = useState<HatOption>('none');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'var(--bg-dashboard)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 4,
        textAlign: 'center',
      }}
    >
      <Box textAlign="left" mb={2}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          ← Return home
        </Button>
      </Box>

      <h1 style={{ marginBottom: '1rem' }}>Dressing Room</h1>
      <p style={{ marginBottom: '2rem' }}>
        Customize your Blob Companion with accessories.
      </p>

      <Box className={styles.wrapper}>
        <Box className={styles.floatingGroup}>
          {selectedHat !== 'none' && (
            <img
              src={hatImages[selectedHat]!}
              alt="Hat"
              style={{
                position: 'absolute',
                top: -55,
                left: 0,
                width: '100%',
                zIndex: 2,
                animation: 'float 3s ease-in-out infinite',
              }}
            />
          )}
          <img
            src={BlobBase}
            alt="Blob Companion"
            style={{
              width: '100%',
              position: 'absolute',
              top: 50,
              left: 0,
              zIndex: 1,
              animation: 'float 3s ease-in-out infinite',
            }}
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
                  onClick={() => {
                    if (unlocked) setSelectedHat(option);
                  }}
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
          onClick={() => alert(`Hat "${selectedHat}" applied!`)}
          disabled={selectedHat === 'none'}
        >
          Apply Hat
        </Button>
      </Box>
    </Box>
  );
}
