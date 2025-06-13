import { useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import styles from './FocusPage.module.css';
import { useTimer } from '@hooks/useTimer';
import { useYoutubeEmbed } from '@hooks/useYoutubeLink';
import { useTodoList } from '@hooks/useTodoList';
import { useStats } from '@hooks/useStats';
import { useCoins } from '@hooks/useCoins';
import { StatsChart } from '@components/StatChart/StatChart';

export default function FocusPage() {
  const { stats, addOrUpdateToday } = useStats();
  const { coins, addCoins } = useCoins();
  const elapsedRef = useRef(0);
  const rewarded15Ref = useRef(false);

  const {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    incrementMinutes,
    decrementMinutes
  } = useTimer(
    45,
    (delta) => {
      addOrUpdateToday(delta);
      elapsedRef.current += delta;
      if (elapsedRef.current >= 15 && !rewarded15Ref.current) {
        addCoins(5);
        rewarded15Ref.current = true;
      }
    },
    () => {
      if (elapsedRef.current >= 45) {
        addCoins(10);
      }
      elapsedRef.current = 0;
      rewarded15Ref.current = false;
    }
  );

  const {
    url: videoUrl,
    setUrl: setVideoUrl,
    embedUrl: embeddedUrl,
    handleAdd: handleAddVideo
  } = useYoutubeEmbed();

  const {
    todos,
    newTask,
    setNewTask,
    handleAddTodo,
    handleDeleteTodo
  } = useTodoList();

  return (
    <PageLayout>
      <h1>🎯 Focus</h1>

      <Box mb={3}>
        <strong>Pièces :</strong> {coins}
      </Box>

      <Box className={styles.statsSection} mb={4}>
        <h2>Statistiques quotidiennes</h2>
        <StatsChart data={stats} />
      </Box>

      <Box display="flex" gap={4} flexWrap="wrap" alignItems="flex-start">
        <Box
          className={styles.timerSection}
          flex="1"
          minWidth="350px"
          maxWidth="500px"
        >
          <h2 className={styles.timerDisplay}>
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </h2>
          <Box>
            <IconButton
              onClick={incrementMinutes}
              disabled={minutes >= 60}
            >
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton
              onClick={decrementMinutes}
              disabled={minutes <= 1}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
          <Box className={styles.controls}>
            <Button
              variant="contained"
              onClick={isRunning ? pause : start}
              startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={reset} variant="outlined">
              Reset
            </Button>
          </Box>
        </Box>

        <Box flexShrink={0} width="300px">
          <h2>Video Playlist</h2>
          <Box display="flex" gap={1} mb={2}>
            <TextField
              label="YouTube video URL"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              size="small"
              fullWidth
            />
            <Button variant="outlined" onClick={handleAddVideo}>
              Add
            </Button>
          </Box>
          {embeddedUrl && (
            <Box mt={2}>
              <iframe
                style={{ borderRadius: '8px' }}
                width="100%"
                height="180"
                src={embeddedUrl}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box mt={4}>
        <h2>📝 To-Do List</h2>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="New task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddTodo} variant="contained">
            Add
          </Button>
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
      </Box>
    </PageLayout>
  );
}
