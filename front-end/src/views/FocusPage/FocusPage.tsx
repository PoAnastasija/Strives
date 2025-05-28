import { useState, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import styles from './FocusPage.module.css';

export default function FocusPage() {
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [todos, setTodos] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [embeddedUrl, setEmbeddedUrl] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (minutes === 0 && s === 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }

          if (s === 0) {
            setMinutes((m) => Math.max(m - 1, 0));
            return 59;
          }

          return s - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setMinutes(45);
    setSeconds(0);
  };

  const incrementMinutes = () => setMinutes((prev) => Math.min(prev + 1, 60));
  const decrementMinutes = () => setMinutes((prev) => Math.max(prev - 1, 1));

  const handleAddTodo = () => {
    if (newTask.trim()) {
      setTodos([...todos, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  const handleAddVideo = () => {
    try {
      const url = new URL(videoUrl);
      let videoId = '';
      if (url.hostname.includes('youtube.com')) {
        videoId = url.searchParams.get('v') || '';
      } else if (url.hostname.includes('youtu.be')) {
        videoId = url.pathname.substring(1);
      }
      if (videoId) {
        setEmbeddedUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setEmbeddedUrl(videoUrl);
      }
    } catch {
      setEmbeddedUrl('');
    }
  };

  return (
    <PageLayout>
      <h1>🎯 Focus</h1>

      <Box className={styles.timerSection}>
        <h2 className={styles.timerDisplay}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </h2>
        <Box>
          <IconButton onClick={incrementMinutes}><ArrowUpwardIcon /></IconButton>
          <IconButton onClick={decrementMinutes}><ArrowDownwardIcon /></IconButton>
        </Box>
        <Box className={styles.controls}>
          <Button
            variant="contained"
            onClick={isRunning ? pauseTimer : startTimer}
            startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outlined">Reset</Button>
        </Box>
      </Box>

      <div>
        <h2>📝 To-Do List</h2>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddTodo} variant="contained">Add</Button>
        </Box>
        <List>
          {todos.map((task, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteTodo(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              {task}
            </ListItem>
          ))}
        </List>
      </div>

      <div className={styles.videoSection}>
        <h2>Video Playlist</h2>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Youtube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleAddVideo}>Ajouter</Button>
        </Box>
        {embeddedUrl && (
          <Box mt={3}>
            <iframe
              width="100%"
              height="600"
              src={embeddedUrl}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}
      </div>
    </PageLayout>
  );
}
