import { Box, Fade } from '@mui/material';

type Props = {
  show: boolean;
  top: number; left: number;
  onMouseDown: React.MouseEventHandler;
  children: React.ReactNode;
};

export function Popup({ show, top, left, onMouseDown, children }: Props) {
  return (
    <Fade in={show} timeout={300}>
      <Box 
        onMouseDown={onMouseDown}
        sx={{
          position: 'absolute', top, left,
          cursor: 'grab', zIndex: 999,
          bgcolor: 'background.paper', p: 2,
          borderRadius: 2, boxShadow: 4, backdropFilter: 'blur(15px)'
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}
