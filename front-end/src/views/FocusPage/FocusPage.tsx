import { Box, TextField, Button, List, ListItem, IconButton } from '@mui/material';
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

export default function FocusPage() {
  const {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    incrementMinutes,
    decrementMinutes
  } = useTimer(45);

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
            onClick={isRunning ? pause : start}
            startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} variant="outlined">Reset</Button>
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
            label="YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleAddVideo}>Add</Button>
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
