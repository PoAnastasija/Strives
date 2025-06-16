import { useEffect, useState } from 'react';
import { Typography, Checkbox, List, ListItem, ListItemText, Paper } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';

interface Task {
  day: number;
  description: string;
  completed: boolean;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  days: number;
  tasks: Task[];
  completed: boolean;
}

export default function QuestPage() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const quest: Quest = {
      id: 'focus-21',
      title: 'Défi Focus 21 Jours',
      description: 'Améliore ta concentration avec des sessions quotidiennes.',
      days: 21,
      completed: false,
      tasks: Array.from({ length: 21 }, (_, i) => ({
        day: i + 1,
        description: `Faire une session de 45 min de deep work`,
        completed: false,
      })),
    };
    setQuests([quest]);
  }, []);

  const completeTask = (questId: string, day: number) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              tasks: quest.tasks.map((task) =>
                task.day === day ? { ...task, completed: true } : task
              ),
              completed: quest.tasks.every((task) =>
                task.day === day ? true : task.completed
              ),
            }
          : quest
      )
    );
  };

  return (
    <PageLayout>
      <Typography variant="h4" mb={3}>🏆 Défis 21/30 Jours</Typography>

      {quests.map((quest) => (
        <Paper key={quest.id} elevation={3} style={{ padding: 16, marginBottom: 24 }}>
          <Typography variant="h6">{quest.title}</Typography>
          <Typography variant="body2" gutterBottom>{quest.description}</Typography>
          <List>
            {quest.tasks.map((task) => (
              <ListItem key={task.day}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => completeTask(quest.id, task.day)}
                />
                <ListItemText
                  primary={`Jour ${task.day}`}
                  secondary={task.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </PageLayout>
  );
}
