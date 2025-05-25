import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 200;

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f4f5fa',
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><FlagIcon /></ListItemIcon>
          <ListItemText primary="Quests" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><StorefrontIcon /></ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
      </List>
    </Drawer>
  );
};
