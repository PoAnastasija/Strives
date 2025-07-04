import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useRewardStore } from './rewardSlice';
  
  interface AddRewardProps {
    open: boolean;
    onClose: () => void;
  };
  
  export const AddRewardModal = ({ open, onClose }: AddRewardProps) => {
    const { addReward } = useRewardStore();
    const [title, setTitle] = useState<string>('');
    const [cost, setCost] = useState<number>(10);
    const [link, setLink] = useState<string>('');
  
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
        <DialogTitle>Add a reward</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Name" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField
              label="Cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              inputProps={{ min: 1 }}
              fullWidth
            />
            <TextField
              label="Link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  