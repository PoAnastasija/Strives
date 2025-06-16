import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
        <ListItemButton component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {/* <ListItemButton> */}
        <ListItemButton component={Link} to="/quests">
          <ListItemIcon><FlagIcon /></ListItemIcon>
          <ListItemText primary="Quests" />
        </ListItemButton>
        <ListItemButton component={Link} to="/shop">
          <ListItemIcon><StorefrontIcon /></ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItemButton>
        <ListItemButton component={Link} to="/focus">
          <ListItemIcon><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Focus" />
        </ListItemButton>
        <ListItemButton component={Link} to="/projects">
          <ListItemIcon><ComputerIcon /></ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};


