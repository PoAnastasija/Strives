import { useEffect, useRef, useState } from 'react';
import {
  Box, TextField, Button, IconButton, List, ListItem, MenuItem, Select
} from '@mui/material';
import { Pause, PlayArrow, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useTimer } from '@hooks/useTimer';
import { useTodoList } from '@hooks/useTodoList';
import RainSound from '@assets/sounds/rain.mp3';
import RainVideo from '@assets/videos/rain_video.mp4';

export default function FocusPage() {
  const theme = useTheme();
  const elapsedRef = useRef(0);
  const rewarded15Ref = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [bgOption, setBgOption] = useState('forest');
  const [soundOption, setSoundOption] = useState('none');
  const [showTimer, setShowTimer] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  const {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
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

  const popupRef = useRef<HTMLDivElement>(null);
  const todoPopupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPopup, setDraggedPopup] = useState<'timer' | 'todo' | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 100, y: 100 });
  const [todoPopupPos, setTodoPopupPos] = useState({ x: 450, y: 100 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, type: 'timer' | 'todo') => {
    setIsDragging(true);
    setDraggedPopup(type);
    const rect = (type === 'timer' ? popupRef : todoPopupRef).current?.getBoundingClientRect();
    if (rect) {
      setMouseOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggedPopup) return;
    const newPos = {
      x: e.clientX - mouseOffset.x,
      y: e.clientY - mouseOffset.y,
    };
    if (draggedPopup === 'timer') setPopupPos(newPos);
    else if (draggedPopup === 'todo') setTodoPopupPos(newPos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedPopup(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggedPopup, mouseOffset]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioContextRef.current) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = context.createGain();
      const source = context.createMediaElementSource(audio);
      source.connect(gainNode);
      gainNode.connect(context.destination);
      gainNode.gain.value = 2;
      audioContextRef.current = context;
      gainNodeRef.current = gainNode;
      sourceRef.current = source;
    }

    if (soundOption === 'rain') {
      audio.loop = true;
      audio.muted = false;
      audio.play().catch((err) => console.warn('Audio playback error:', err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [soundOption]);

  useEffect(() => {
    if (bgOption === 'rain') {
      setSoundOption('rain');
    }
  }, [bgOption]);

  return (
    <PageLayout>
      {bgOption === 'rain' && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        >
          <source src={RainVideo} type="video/mp4" />
        </video>
      )}

      <Box mb={4} textAlign="center">
        <h1 style={{ fontWeight: 'bold' }}>Focus Mode</h1>
        <p style={{ maxWidth: 500, margin: '0 auto' }}>
          Complete a task, focus on your timer, and earn coins.
        </p>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Select value={bgOption} onChange={(e) => setBgOption(e.target.value)} size="small">
            <MenuItem value="forest">Background Video: Forest</MenuItem>
            <MenuItem value="rain">Background Video: Rain</MenuItem>
          </Select>
          <Select value={soundOption} onChange={(e) => setSoundOption(e.target.value)} size="small">
            <MenuItem value="none">Ambient Sound: None</MenuItem>
            <MenuItem value="rain">Ambient Sound: Rain</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 600,
          right: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Button variant="contained" onClick={() => setShowTimer(prev => !prev)} sx={{ width: 130 }}>
          {showTimer ? 'Hide Timer' : 'Show Timer'}
        </Button>
        <Button variant="contained" onClick={() => setShowTodo(prev => !prev)} sx={{ width: 130 }}>
          {showTodo ? 'Hide To-Do' : 'Show To-Do'}
        </Button>
      </Box>

      {showTimer && (
        <Box
          ref={popupRef}
          onMouseDown={(e) => handleMouseDown(e, 'timer')}
          sx={{
            position: 'absolute',
            top: popupPos.y,
            left: popupPos.x,
            width: 300,
            p: 3,
            borderRadius: 3,
            cursor: 'grab',
            zIndex: 999,
            backgroundColor: theme.palette.mode === 'dark' ? '#1b164a' : '#fff',
            boxShadow: 4,
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Focus Timer</h2>
          <Box sx={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Box>
          <Box display="flex" justifyContent="center" mb={2}>
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
          </Box>
        </Box>
      )}

      {showTodo && (
        <Box
          ref={todoPopupRef}
          onMouseDown={(e) => handleMouseDown(e, 'todo')}
          sx={{
            position: 'absolute',
            top: todoPopupPos.y,
            left: todoPopupPos.x,
            width: 300,
            p: 3,
            borderRadius: 3,
            cursor: 'grab',
            zIndex: 998,
            backgroundColor: theme.palette.mode === 'dark' ? '#1b164a' : '#fff',
            boxShadow: 4,
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>To-Do List</h2>
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
              variant="outlined"
              label="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
              size="small"
            />
            <Button onClick={handleAddTodo} variant="contained">Add</Button>
          </Box>
        </Box>
      )}

      <audio ref={audioRef} src={RainSound} />
    </PageLayout>
  );
}

