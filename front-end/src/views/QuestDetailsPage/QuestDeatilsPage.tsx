import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '@components/layout/PageLayout/PageLayout';

const quests = [
  {
    id: '1',
    icon: '🧘',
    title: '7-Day Meditation Challenge',
    description: 'Meditate for 10 minutes each day for 7 days.',
    xp: 70,
    coins: 30,
    color: '#85caff',
  },
  {
    id: '2',
    icon: '📖',
    title: 'Read every-day',
    description: 'Read for 30 min a day, until it become a habit.',
    xp: 40,
    coins: 10,
    color: '#ffc107',
  },
  {
    id: '3',
    icon: '🎯',
    title: '21-Day Focus Reset',
    description: 'Focus 3h a day for 21 days.',
    xp: 100,
    coins: 50,
    color: '#ab8bff',
  },
];

export default function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const quest = quests.find((q) => q.id === id);

  if (!quest) return <PageLayout><p>Quest not found</p></PageLayout>;

  return (
    <PageLayout>
      <Box p={4}>
        <h1 style={{ fontWeight: 'bold' }}>{quest.icon} {quest.title}</h1>
        <p>{quest.description}</p>
        <p style={{ marginTop: '1rem' }}>Reward: 🪙 {quest.coins} coins &nbsp; | &nbsp; XP: {quest.xp}</p>
      </Box>
    </PageLayout>
  );
}
