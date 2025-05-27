import { Box, TextField, Button, List, ListItem, IconButton } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
  import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
  import PauseIcon from '@mui/icons-material/Pause';
  import PlayArrowIcon from '@mui/icons-material/PlayArrow';
  import { useState, useRef } from 'react';
  import { PageLayout } from '@components/layout/PageLayout/PageLayout';
  
  export default function FocusPage() {
    const [minutes, setMinutes] = useState(45);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [todos, setTodos] = useState<string[]>([]);
    const [newTask, setNewTask] = useState('');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimer = () => {
      if (!isRunning) {
        setIsRunning(true);
            timerRef.current = setInterval(() => {
                setMinutes((m) => {
                setSeconds((s) => {
                    if (m === 0 && s === 0) {
                        clearInterval(timerRef.current!);
                        setIsRunning(false);
                        return 0;
                    }
                    if (s === 0)
                        return 59;
                    return s - 1;
                });
                if (m > 0 && seconds === 0)
                    return m - 1;
                return m;
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
  
    return (
      <PageLayout>
        <h1>🎯 Focus Mode</h1>
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <h2 style={{ fontWeight: 'bold' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h2>
            <Box>
              <IconButton onClick={incrementMinutes}><ArrowUpwardIcon /></IconButton>
              <IconButton onClick={decrementMinutes}><ArrowDownwardIcon /></IconButton>
            </Box>
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={isRunning ? pauseTimer : startTimer}
              startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer} variant="outlined">
              Reset
            </Button>
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
      </PageLayout>
    );
  }
  