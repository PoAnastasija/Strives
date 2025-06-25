import { useEffect, useRef, useState } from 'react';
import { Box,  MenuItem, Select, Fade } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useTimer } from '@hooks/useTimer';
import { useTodoList } from '@hooks/useTodoList';
import RainSound from '@assets/sounds/rain.mp3';
import RainVideo from '@assets/videos/rain_video.mp4';
import { TimerCard } from '@components/cards/TimerCard';
import { TodoListCard } from '@components/cards/TodoListCard';
import { ToggleButton } from '@components/buttons/ToogleButton';

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
        <ToggleButton
          show={showTimer}
          onClick={() => setShowTimer(prev => !prev)}
          labelShow="Show Timer"
          labelHide="Hide Timer"
          iconShow={<Visibility />}
          iconHide={<VisibilityOff />}
          delay={500}
        />
        <ToggleButton
          show={showTodo}
          onClick={() => setShowTodo(prev => !prev)}
          labelShow="Show To-Do"
          labelHide="Hide To-Do"
          iconShow={<Visibility />}
          iconHide={<VisibilityOff />}
          delay={700}
        />
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
            }}
          >
            <TimerCard
              minutes={minutes}
              seconds={seconds}
              isRunning={isRunning}
              onToggle={isRunning ? pause : start}
            />
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
            }}
          >
            <TodoListCard
              todos={todos}
              newTask={newTask}
              setNewTask={setNewTask}
              onAdd={handleAddTodo}
              onDelete={handleDeleteTodo}
            />
          </Box>
        </Fade>
      )}

      <audio ref={audioRef} src={RainSound} />
    </PageLayout>
  );
}
