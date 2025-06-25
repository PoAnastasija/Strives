import { Select, MenuItem } from '@mui/material';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SoundSelector({ value, onChange }: Props) {
  return (
    <Select size="small" value={value} onChange={e => onChange(e.target.value)}>
      <MenuItem value="none">None</MenuItem>
      <MenuItem value="rain">Rain</MenuItem>
    </Select>
  );
}
