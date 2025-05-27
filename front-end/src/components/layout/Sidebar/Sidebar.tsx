import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ComputerIcon from '@mui/icons-material/Computer';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      className={styles.sidebar}
      classes={{ paper: styles.sidebarPaper }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><FlagIcon /></ListItemIcon>
          <ListItemText primary="Quests" />
        </ListItem>
        <ListItem button component={Link} to="/shop">
          <ListItemIcon><StorefrontIcon /></ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem button component={Link} to="/focus">
          <ListItemIcon><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Focus" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ComputerIcon /></ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
    </Drawer>
  );
};


