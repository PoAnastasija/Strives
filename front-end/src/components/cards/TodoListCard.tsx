import { Box, Button, IconButton, List, ListItem, TextField, Typography, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { GlassCard } from './GlassCard.tsx';

interface TodoListCardProps {
  todos: string[];
  newTask: string;
  setNewTask: (value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const TodoListCard = ({
  todos,
  newTask,
  setNewTask,
  onAdd,
  onDelete,
}: TodoListCardProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <GlassCard width={360}>
      <Typography
        variant="h6"
        align="center"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: isDark ? '#74b9ff' : '#2980b9',
        }}
      >
        To-Do List
      </Typography>

      <List sx={{ maxHeight: 200, overflow: 'auto' }}>
        {todos.map((task, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              borderRadius: 2,
              mb: 1,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              color: isDark ? '#ffffff' : '#333333',
            }}
            secondaryAction={
              <IconButton onClick={() => onDelete(index)} color="error">
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
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          size="small"
          sx={{
            borderRadius: 5,
            input: {
              background: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
              color: isDark ? '#fff' : '#000',
              borderRadius: 2,
              px: 2,
              py: 1,
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />
        <Button
          onClick={onAdd}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
            color: 'white',
            px: 3,
            borderRadius: 3,
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(45deg, #5aa3f0, #0770c4)',
            },
          }}
        >
          ADD
        </Button>
      </Box>
    </GlassCard>
  );
};
