import { useRef } from 'react';
import { Box, TextField, Button, List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
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
      <Box width="100%">
        <Box mb={4} textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Focus Mode
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth="500px"
            mx="auto"
          >
            Stay productive and earn rewards while focusing.
          </Typography>
        </Box>

        <Box mb={3} textAlign="center">
          <Typography fontWeight="bold">Coins: {coins}</Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Daily Statistics
          </Typography>
          <StatsChart data={stats} />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={4} alignItems="flex-start">

          <Box
            flex="1"
            minWidth="320px"
            maxWidth="500px"
            sx={{
              backgroundColor: 'background.paper',
              p: 3,
              borderRadius: 4,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight="bold"
              mb={2}
            >
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </Typography>

            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton onClick={incrementMinutes} disabled={minutes >= 60}>
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton onClick={decrementMinutes} disabled={minutes <= 1}>
                <ArrowDownwardIcon />
              </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" gap={2}>
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

          <Box
            flexShrink={0}
            width="300px"
            sx={{
              backgroundColor: 'background.paper',
              p: 3,
              borderRadius: 4,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Video Playlist
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                label="YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
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

        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            To-Do List
          </Typography>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="New task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
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
      </Box>
    </PageLayout>
  );
}
