import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import StorefrontIcon from '@mui/icons-material/Storefront';
import styles from './Sidebar.module.css';


export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      className={styles.sidebar}
      classes={{ paper: styles.sidebarPaper }}
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

