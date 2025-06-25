import { Grow, Button } from '@mui/material';

type Props = {
  show: boolean;
  onClick: () => void;
  labelShow: string;
  labelHide: string;
  iconShow: React.ReactNode;
  iconHide: React.ReactNode;
  delay?: number;
};

export function ToggleButton({
  show, onClick, labelShow, labelHide, iconShow, iconHide, delay = 500
}: Props) {
  return (
    <Grow in timeout={delay}>
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={show ? iconHide : iconShow}
        sx={{
          width: 160,
          height: 50,
          borderRadius: 25,
          fontWeight: 'bold',
          fontSize: '1rem',
          textTransform: 'none',
        }}
      >
        {show ? labelHide : labelShow}
      </Button>
    </Grow>
  );
}
