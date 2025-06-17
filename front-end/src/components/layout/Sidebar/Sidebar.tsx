import { NavLink } from 'react-router-dom';
import {
  HomeRounded,
  EmojiEventsRounded,
  ShoppingBagRounded,
  AccessTimeRounded,
  FolderRounded,
} from '@mui/icons-material';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const links = [
    { to: '/', label: 'Home', icon: <HomeRounded /> },
    { to: '/quests', label: 'Quests', icon: <EmojiEventsRounded /> },
    { to: '/shop', label: 'Shop', icon: <ShoppingBagRounded /> },
    { to: '/focus', label: 'Focus', icon: <AccessTimeRounded /> },
    { to: '/projects', label: 'Projects', icon: <FolderRounded /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Strives</h2>
      <nav className={styles.nav}>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};


