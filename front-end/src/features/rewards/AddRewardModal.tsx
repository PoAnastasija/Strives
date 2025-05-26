import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useRewardStore } from './rewardSlice';
  
  type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  export const AddRewardModal = ({ open, onClose }: Props) => {
    const { addReward } = useRewardStore();
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState(10);
    const [link, setLink] = useState('');
  
    const handleAdd = () => {
      if (!title.trim()) return;
      addReward({ id: crypto.randomUUID(), title, cost, link });
      setTitle('');
      setCost(10);
      setLink('');
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Ajouter une récompense</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Nom" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField
              label="Coût"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              inputProps={{ min: 1 }}
              fullWidth
            />
            <TextField
              label="Lien (facultatif)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAdd}>
              Ajouter
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  