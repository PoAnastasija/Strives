import { useRef, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Pause, PlayArrow, Delete } from '@mui/icons-material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useTimer } from '@hooks/useTimer';
import { useTodoList } from '@hooks/useTodoList';
import { useCoins } from '@hooks/useCoins';
import { useUserXp } from '@hooks/useUserXp';

export default function FocusPage() {
  const { coins, addCoins } = useCoins();
  const xp = useUserXp();
  const level = Math.floor(xp / 100);
  const progress = xp % 100;

  const elapsedRef = useRef(0);
  const rewarded15Ref = useRef(false);

  const [bgOption, setBgOption] = useState('forest');
  const [soundOption, setSoundOption] = useState('rain');

  const {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
  } = useTimer(
    25,
    (delta) => {
      elapsedRef.current += delta;
      if (elapsedRef.current >= 15 && !rewarded15Ref.current) {
        addCoins(5);
        rewarded15Ref.current = true;
      }
    },
    () => {
      if (elapsedRef.current >= 25) {
        addCoins(10);
      }
      elapsedRef.current = 0;
      rewarded15Ref.current = false;
    }
  );

  const {
    todos,
    newTask,
    setNewTask,
    handleAddTodo,
    handleDeleteTodo,
  } = useTodoList();

  return (
    <PageLayout>
      <Box sx={{ px: 4, py: 6 }}>
        <Box display="flex" gap={4} justifyContent="center" mb={4}>
          <Select value={bgOption} onChange={(e) => setBgOption(e.target.value)}>
            <MenuItem value="forest">Background Video: Forest</MenuItem>
          </Select>
          <Select value={soundOption} onChange={(e) => setSoundOption(e.target.value)}>
            <MenuItem value="rain">Ambient Sound: Rain</MenuItem>
          </Select>
        </Box>

        <Box display="flex" justifyContent="center" gap={6} flexWrap="wrap">
          <Box
            sx={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 5,
              p: 4,
              minWidth: 280,
              color: '#fff',
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              To-Do List
            </Typography>
            <List>
              {todos.map((task, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton onClick={() => handleDeleteTodo(index)} color="inherit">
                      <Delete />
                    </IconButton>
                  }
                >
                  {task}
                </ListItem>
              ))}
            </List>
            <Box display="flex" gap={1} mt={2}>
              <TextField
                variant="filled"
                label="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                fullWidth
                size="small"
              />
              <Button onClick={handleAddTodo} variant="contained">
                Add
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: 480,
              height: 280,
              borderRadius: 5,
              overflow: 'hidden',
              backgroundColor: 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Typography variant="h6" mb={1}>Focus</Typography>
            <Box
              component="video"
              src=""
              autoPlay
              muted
              loop
              controls
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 8,
            p: 2,
          }}
        >
          <Box>
            <Typography variant="body2">LV {level}</Typography>
            <Box
              width={120}
              height={8}
              bgcolor="#666"
              borderRadius={4}
              mt={0.5}
            >
              <Box
                width={`${progress}%`}
                height="100%"
                bgcolor="#BDA6FF"
                borderRadius={4}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={isRunning ? pause : start}
            startIcon={isRunning ? <Pause /> : <PlayArrow />}
            sx={{
              px: 4,
              py: 1,
              borderRadius: '50px',
              fontWeight: 'bold',
              backgroundColor: '#BDA6FF',
              color: '#fff',
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>

          <Typography fontWeight="bold" color="white">
            🪙 {coins}
          </Typography>
        </Box>
      </Box>
    </PageLayout>
  );
}
