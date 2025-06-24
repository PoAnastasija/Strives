import { useParams } from 'react-router-dom';
import {
  Box, Button, LinearProgress, Checkbox, Alert, Card, CardContent, Chip,
  Avatar, Stack, Paper, Tooltip
} from '@mui/material';
import {
  RestartAlt as RestartIcon,
  CheckCircle as CheckIcon,
  EmojiEvents as TrophyIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const quests = [
  {
    id: '1',
    icon: '📖',
    title: '60 days to learn a language',
    description: 'Study every-day until you learn all the basics !',
    xp: 500,
    coins: 60,
    duration: 60,
    color: '#85caff',
    gradient: 'linear-gradient(135deg, #85caff 0%, #5ba3f5 100%)',
    tasks: [
      'Study 20 new words',
      'Practice speaking for 10 minutes',
      'Watch a short video or series clip in the language',
      'Review yesterday’s material',
      'Write 3 sentences using today’s vocabulary'
    ]
  },

    {
    id: '2',
    icon: '📵',
    title: 'Digital detox',
    description: '7 days without any social media',
    xp: 70,
    coins: 30,
    duration: 7,
    color: '#85caff',
    gradient: 'linear-gradient(135deg, #85caff 0%, #5ba3f5 100%)',
    tasks: [
      'Spend 1h today on social media', 'Replace your phone time with other activities',
      'Every time you get the urge to get on your phone, write it down'
    ]
  }
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
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

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

  if (!quest) return (
    <PageLayout>
      <Box><h2>Quest not found</h2></Box>
    </PageLayout>
  );

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

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  const handleRestart = () => {
    const emptyDays = new Array(quest.duration).fill(false);
    setCompletedDays(emptyDays);
    setDayIndex(0);
    setTaskChecks(new Array(quest.tasks.length).fill(false));
    setLastCompletionDate(null);
    localStorage.removeItem(`quest-progress-${quest.id}`);
    setShowAlert(false);
  };

  const progress = completedDays.filter(Boolean).length / quest.duration;
  const isQuestComplete = progress === 1;
  const allTasksCompleted = taskChecks.every(Boolean);

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        {showConfetti && <Confetti width={width} height={height} />}

        <Card sx={{ mb: 3, background: quest.gradient, color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar sx={{ width: 64, height: 64, fontSize: '2rem', bgcolor: 'rgba(255,255,255,0.2)' }}>{quest.icon}</Avatar>
              <Box>
                <h1 style={{ fontWeight: 'bold', margin: 0 }}>{quest.title}</h1>
                <p style={{ opacity: 0.9 }}>{quest.description}</p>
              </Box>
            </Box>
            <Stack direction="row" spacing={2} mt={3}>
              <Chip icon={<span>🪙</span>} label={`${quest.coins} coins`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
              <Chip icon={<TrophyIcon />} label={`${quest.xp} XP`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
              <Chip icon={<TimeIcon />} label={`${quest.duration} days`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <h3 style={{ margin: 0 }}>Overall Progress</h3>
              <h2 style={{ margin: 0, color: quest.color }}>{Math.round(progress * 100)}%</h2>
            </Box>
            <LinearProgress variant="determinate" value={progress * 100} sx={{ height: 12, borderRadius: 6, bgcolor: 'rgba(0,0,0,0.1)', '& .MuiLinearProgress-bar': { background: quest.gradient, borderRadius: 6 } }} />
            <Box mt={2}><p>{completedDays.filter(Boolean).length} of {quest.duration} days completed</p></Box>
          </CardContent>
        </Card>

        {!isQuestComplete && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <h3 style={{ margin: 0 }}>Day {dayIndex + 1} Tasks</h3>
                <Chip label={allTasksCompleted ? "All Complete!" : `${taskChecks.filter(Boolean).length}/${quest.tasks.length}`} color={allTasksCompleted ? "success" : "default"} variant={allTasksCompleted ? "filled" : "outlined"} />
              </Box>
              <Stack spacing={2}>
                {quest.tasks.map((task, i) => (
                  <Paper key={i} sx={{ p: 2, cursor: 'pointer', border: taskChecks[i] ? `2px solid ${quest.color}` : '2px solid transparent', bgcolor: '#8583eb', transition: 'all 0.2s ease', '&:hover': { bgcolor: taskChecks[i] ? `${quest.color}25` : 'action.hover' } }} onClick={() => handleTaskToggle(i)}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Checkbox checked={taskChecks[i]} onChange={() => handleTaskToggle(i)} sx={{ color: quest.color, '&.Mui-checked': { color: quest.color } }} />
                      <p style={{ textDecoration: taskChecks[i] ? 'line-through' : 'none', color: taskChecks[i] ? 'gray' : 'inherit' }}>{task}</p>
                    </Box>
                  </Paper>
                ))}
              </Stack>
              <Box mt={3}>
                <Button variant="contained" size="large" fullWidth onClick={handleMarkDone} disabled={!allTasksCompleted || !isNewDay(lastCompletionDate)} sx={{ background: quest.gradient, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', '&:hover': { background: quest.gradient, filter: 'brightness(1.1)' }, '&:disabled': { background: 'action.disabledBackground' } }}>
                  {!isNewDay(lastCompletionDate) ? "Come back tomorrow!" : "Complete Day"}
                </Button>
              </Box>
              {showAlert && (<Alert severity="warning" sx={{ mt: 2 }} onClose={() => setShowAlert(false)}>{isNewDay(lastCompletionDate) ? 'Please complete all tasks before marking as done.' : 'You have already completed today\'s tasks. Come back tomorrow!'}</Alert>)}
            </CardContent>
          </Card>
        )}

        {isQuestComplete && (
          <Card sx={{ mb: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <TrophyIcon sx={{ fontSize: 64, mb: 2 }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Quest Completed!</h2>
              <p>Congratulations! You've successfully completed the {quest.title}</p>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Chip label={`+${quest.coins} coins`} color="warning" />
                <Chip label={`+${quest.xp} XP`} color="info" />
              </Stack>
            </CardContent>
          </Card>
        )}

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <h3 style={{ marginBottom: '1rem' }}>Daily Progress Tracker</h3>
            <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
              {completedDays.map((done, i) => (
                <Tooltip key={i} title={`Day ${i + 1}${done ? ' - Completed' : ' - Pending'}`}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? quest.gradient : 'rgba(0,0,0,0.1)', color: done ? 'white' : 'text.secondary', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s ease', border: i === dayIndex ? `3px solid ${quest.color}` : '3px solid transparent', '&:hover': { transform: 'scale(1.1)' } }}>
                    {done ? <CheckIcon /> : i + 1}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box display="flex" gap={2} justifyContent="center">
              <Button variant="outlined" startIcon={<RestartIcon />} onClick={handleRestart} size="large" sx={{ borderColor: quest.color, color: quest.color, '&:hover': { borderColor: quest.color, bgcolor: `${quest.color}10` } }}>
                Restart Quest
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PageLayout>
  );
}
