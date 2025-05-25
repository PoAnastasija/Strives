import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const drawerWidth = 240;

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon><ChecklistIcon /></ListItemIcon>
          <ListItemText primary="Tâches" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><EmojiEmotionsIcon /></ListItemIcon>
          <ListItemText primary="Humeur" />
        </ListItem>
      </List>
    </Drawer>
  );
};
