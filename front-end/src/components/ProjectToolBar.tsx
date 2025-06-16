import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  search: string;
  statusFilter: string;
  onSearchChange: (s: string) => void;
  onStatusChange: (s: string) => void;
  onAddClick: () => void;
};

export default function ProjectsToolbar({
  search, statusFilter, onSearchChange, onStatusChange, onAddClick
}: Props) {
  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <TextField
        label="Search…"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={statusFilter}
          onChange={e => onStatusChange(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        Add Project
      </Button>
    </Box>
  );
}
