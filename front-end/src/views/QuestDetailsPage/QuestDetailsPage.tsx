import { useParams } from 'react-router-dom';
import { Box, Button, LinearProgress, Checkbox, Alert } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useEffect, useState } from 'react';

const quests = [
  {
    id: '1',
    icon: '🧘',
    title: '7-Day Meditation Challenge',
    description: 'Meditate for 10 minutes each day for 7 days.',
    xp: 70,
    coins: 30,
    duration: 7,
    color: '#85caff',
    tasks: ['Meditate 10 minutes', 'Write reflections'],
  },
  {
    id: '2',
    icon: '📖',
    title: 'Read every-day',
    description: 'Read for 30 min a day, until it become a habit.',
    xp: 40,
    coins: 10,
    duration: 14,
    color: '#ffc107',
    tasks: ['Read 30 min', 'Summarize what you read'],
  },
  {
    id: '3',
    icon: '🎯',
    title: '21-Day Focus Reset',
    description: 'Focus 3h a day for 21 days.',
    xp: 100,
    coins: 50,
    duration: 21,
    color: '#ab8bff',
    tasks: ['Focus for 3 hours', 'Rate your focus (1-10)'],
  },
];

function isNewDay(lastDate: string | null) {
  if (!lastDate) return true;
  const today = new Date().toDateString();
  return new Date(lastDate).toDateString() !== today;
}

export default function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const quest = quests.find((q) => q.id === id);

  const [dayIndex, setDayIndex] = useState(0);
  const [completedDays, setCompletedDays] = useState<boolean[]>([]);
  const [taskChecks, setTaskChecks] = useState<boolean[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);

  useEffect(() => {
    if (!quest) return;

    const savedProgress = localStorage.getItem(`quest-progress-${quest.id}`);

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setCompletedDays(parsed.completedDays);
      setDayIndex(parsed.dayIndex);
      setLastCompletionDate(parsed.lastCompletionDate || null);
    } else {
      setCompletedDays(new Array(quest.duration).fill(false));
    }

    setTaskChecks(new Array(quest.tasks.length).fill(false));
  }, [quest]);

  if (!quest) return <PageLayout><p>Quest not found</p></PageLayout>;

  const handleTaskToggle = (index: number) => {
    const updated = [...taskChecks];
    updated[index] = !updated[index];
    setTaskChecks(updated);
  };

  const handleMarkDone = () => {
    if (!taskChecks.every(Boolean)) {
      setShowAlert(true);
      return;
    }

    if (!isNewDay(lastCompletionDate)) {
      setShowAlert(true);
      return;
    }

    const updatedDays = [...completedDays];
    updatedDays[dayIndex] = true;
    const nextDay = Math.min(dayIndex + 1, quest.duration - 1);

    const today = new Date().toISOString();

    setCompletedDays(updatedDays);
    setDayIndex(nextDay);
    setTaskChecks(new Array(quest.tasks.length).fill(false));
    setShowAlert(false);
    setLastCompletionDate(today);

    localStorage.setItem(`quest-progress-${quest.id}`, JSON.stringify({
      completedDays: updatedDays,
      dayIndex: nextDay,
      lastCompletionDate: today,
    }));
  };

  const handleRestart = () => {
    const emptyDays = new Array(quest.duration).fill(false);
    setCompletedDays(emptyDays);
    setDayIndex(0);
    setTaskChecks(new Array(quest.tasks.length).fill(false));
    setLastCompletionDate(null);
    localStorage.removeItem(`quest-progress-${quest.id}`);
  };

  const progress = completedDays.filter(Boolean).length / quest.duration;

  return (
    <PageLayout>
      <Box p={4}>
        <h1 style={{ fontWeight: 'bold' }}>{quest.icon} {quest.title}</h1>
        <p>{quest.description}</p>
        <p style={{ marginTop: '1rem' }}>
          Reward: 🪙 {quest.coins} coins &nbsp; | &nbsp; XP: {quest.xp}
        </p>

        <LinearProgress
          variant="determinate"
          value={progress * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            mt: 2,
            mb: 1,
            '& .MuiLinearProgress-bar': {
              backgroundColor: quest.color,
            },
          }}
        />
        <p>{Math.round(progress * 100)}% completed</p>

        <Box mt={4}>
          <h3>Day {dayIndex + 1} Tasks</h3>
          {quest.tasks.map((task, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mt={1}>
              <Checkbox checked={taskChecks[i]} onChange={() => handleTaskToggle(i)} />
              <span>{task}</span>
            </Box>
          ))}

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleMarkDone}>
            Done for today
          </Button>

          {showAlert && <Alert severity="warning" sx={{ mt: 2 }}>
            {isNewDay(lastCompletionDate)
              ? 'Please complete all tasks before marking as done.'
              : 'You have already completed today\'s tasks. Come back tomorrow!'}
          </Alert>}
        </Box>

        <Box mt={4}>
          <h3>Progress Tracker</h3>
          <Box display="flex" gap={1} flexWrap="wrap">
            {completedDays.map((done, i) => (
              <Box
                key={i}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '28px',
                  backgroundColor: done ? quest.color : '#ccc',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                {i + 1}
              </Box>
            ))}
          </Box>
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button variant="outlined" onClick={handleRestart}>
            Restart Quest
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
}
