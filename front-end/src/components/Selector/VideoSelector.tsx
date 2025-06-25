import { Select, MenuItem } from '@mui/material';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function BackgroundSelector({ value, onChange }: Props) {
  return (
    <Select size="small" value={value} onChange={e => onChange(e.target.value)}>
      <MenuItem value="forest">Forest</MenuItem>
      <MenuItem value="rain">Rain</MenuItem>
    </Select>
  );
}
