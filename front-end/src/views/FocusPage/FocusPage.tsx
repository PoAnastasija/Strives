import { useEffect, useRef, useState } from 'react';
import {
  Box, TextField, Button, IconButton, List, ListItem, MenuItem, Select, Fade, Grow
} from '@mui/material';
import { Pause, PlayArrow, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
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
      //ajouter les +5 de pièces pour 15min et + 10 pour 25min
      elapsedRef.current += delta;
      if (elapsedRef.current >= 15 && !rewarded15Ref.current) {
        rewarded15Ref.current = true;
      }
    },
    () => {
      if (elapsedRef.current >= 25) {
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
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: bgOption === 'rain' 
            ? 'linear-gradient(135deg,rgb(85, 108, 207) 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%)',
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />

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
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        >
          <source src={RainVideo} type="video/mp4" />
        </video>
      )}
      
      <Fade in={true} timeout={800}>
        <Box mb={4} textAlign="center">
          <h1 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Focus Mode</h1>
          <p style={{ maxWidth: 500, margin: '0 auto' }}>
            Complete a task, focus on your timer, and earn coins.
          </p>
        </Box>
      </Fade>

        <Box 
          mt={3} 
          display="flex" 
          justifyContent="center" 
          gap={3}
          flexWrap="wrap"
        >
          <Select 
            value={bgOption} 
            onChange={(e) => setBgOption(e.target.value)} 
            size="small"
            sx={{
              minWidth: 200,
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(27, 22, 74, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSvgIcon-root': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              },
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <MenuItem value="forest">Background: Forest</MenuItem>
            <MenuItem value="rain">Background: Rain</MenuItem>
          </Select>
          <Select
            value={soundOption}
            onChange={(e) => setSoundOption(e.target.value)}
            size="small"
            sx={{
              minWidth: 200,
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(27, 22, 74, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSvgIcon-root': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              },
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: 2,
            }}
          >
            <MenuItem value="none">Sound: None</MenuItem>
            <MenuItem value="rain">Sound: Rain</MenuItem>
          </Select>
      </Box>

      {bgOption === 'rain' && (
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '70%', md: '60%' },
              maxWidth: 600,
              aspectRatio: '16/9',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <source src={RainVideo} type="video/mp4" />
            </video>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
                p: 2,
                textAlign: 'center',
              }}
            >
            </Box>
          </Box>
        </Fade>
      )}

      <Box
        sx={{
          position: 'fixed',
          bottom: 500,
          right: 70,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 50,
        }}
      >
        <Grow in={true} timeout={500}>
          <Button 
            variant="contained" 
            onClick={() => setShowTimer(prev => !prev)} 
            sx={{ 
              width: 160,
              height: 50,
              borderRadius: 25,
              background: 'linear-gradient(45deg, #667eea,rgb(158, 85, 230))',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8, #6a42a0)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
              },
              transition: 'all 0.3s ease',
            }}
            startIcon={showTimer ? <VisibilityOff /> : <Visibility />}
          >
            {showTimer ? 'Hide Timer' : 'Show Timer'}
          </Button>
        </Grow>
        <Grow in={true} timeout={700}>
          <Button 
            variant="contained" 
            onClick={() => setShowTodo(prev => !prev)} 
            sx={{ 
              width: 160,
              height: 50,
              borderRadius: 25,
              background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
              boxShadow: '0 8px 25px rgba(116, 185, 255, 0.4)',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #5aa3f0, #0770c4)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(116, 185, 255, 0.6)',
              },
              transition: 'all 0.3s ease',
            }}
            startIcon={showTodo ? <VisibilityOff /> : <Visibility />}
          >
            {showTodo ? 'Hide To-Do' : 'Show To-Do'}
          </Button>
        </Grow>
      </Box>

      {showTimer && (
        <Fade in={showTimer} timeout={300}>
          <Box
            ref={popupRef}
            onMouseDown={(e) => handleMouseDown(e, 'timer')}
            sx={{
              position: 'absolute',
              top: popupPos.y,
              left: popupPos.x,
              width: 320,
              p: 3,
              borderRadius: 4,
              cursor: isDragging && draggedPopup === 'timer' ? 'grabbing' : 'grab',
              zIndex: 999,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(27, 22, 74, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                : '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 25px 70px rgba(0, 0, 0, 0.8)'
                  : '0 25px 70px rgba(0, 0, 0, 0.4)',
              }
            }}
          >
            <h2 style={{ 
              marginBottom: '1.5rem',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem'
            }}>
              Focus Timer
            </h2>
            <Box sx={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              mb: 2,
              color: theme.palette.mode === 'dark' ? '#fff' : '#333',
              fontFamily: 'monospace',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Box>
            <Box display="flex" justifyContent="center" mb={2}>
              <Button
                variant="contained"
                onClick={isRunning ? pause : start}
                startIcon={isRunning ? <Pause /> : <PlayArrow />}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  background: isRunning 
                    ? 'linear-gradient(45deg, #ff7675, #d63031)'
                    : 'linear-gradient(45deg, #00b894, #00a085)',
                  color: '#fff',
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isRunning ? 'Pause' : 'Start Focus'}
              </Button>
            </Box>
          </Box>
        </Fade>
      )}

      {showTodo && (
        <Fade in={showTodo} timeout={300}>
          <Box
            ref={todoPopupRef}
            onMouseDown={(e) => handleMouseDown(e, 'todo')}
            sx={{
              position: 'absolute',
              top: todoPopupPos.y,
              left: todoPopupPos.x,
              width: 350,
              p: 3,
              borderRadius: 4,
              cursor: isDragging && draggedPopup === 'todo' ? 'grabbing' : 'grab',
              zIndex: 998,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(27, 22, 74, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                : '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 25px 70px rgba(0, 0, 0, 0.8)'
                  : '0 25px 70px rgba(0, 0, 0, 0.4)',
              }
            }}
          >
            <h2 style={{ 
              marginBottom: '1.5rem',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem'
            }}>
              To-Do List
            </h2>
            <List sx={{ maxHeight: 200, overflow: 'auto' }}>
              {todos.map((task, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(116, 185, 255, 0.2)'
                      : 'rgba(116, 185, 255, 0.1)',
                    borderRadius: 2,
                    mb: 1,
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(116, 185, 255, 0.3)'
                      : '1px solid rgba(116, 185, 255, 0.2)',
                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                  }}
                  secondaryAction={
                    <IconButton 
                      onClick={() => handleDeleteTodo(index)} 
                      color="error"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 99, 99, 0.1)',
                        }
                      }}
                    >
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
                placeholder="What do you need to focus on?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.8)',
                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                  },
                  '& .MuiOutlinedInput-input::placeholder': {
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                  }
                }}
              />
              <Button 
                onClick={handleAddTodo} 
                variant="contained"
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5aa3f0, #0770c4)',
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      )}

      <audio ref={audioRef} src={RainSound} />
    </PageLayout>
  );
}