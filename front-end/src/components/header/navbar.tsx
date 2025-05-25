// import { useState } from 'react';

// interface NavBarProps{
//     brandName: string;
//     logoPath: string;
// }

// //fix la navbar pour qu'elle fasse la taille de tt l'écran
// function NavBar({brandName, logoPath}: NavBarProps) {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     return (
//         <nav style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0.5rem 1rem',
//           backgroundColor: '#f8f9fa',
//           boxShadow: '0 2px 3px rgba(0,0,0,0.1)'
//         }}>
//           {/* Logo et nom de marque */}
//           <a href="#" style={{
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             color: '#212529',
//             fontWeight: 'bold',
//             fontSize: '1.25rem'
//           }}>
//             <img
//               src={logoPath}
//               width="30"
//               height="30"
//               style={{
//                 display: 'inline-block',
//                 verticalAlign: 'top',
//                 marginRight: '0.5rem'
//               }}
//               alt="" 
//             />
//             <span style={{
//               fontWeight: 'bolder',
//               fontSize: '1.5rem'
//             }}>
//               {brandName}
//             </span>
//           </a>
          
//           {/* Bouton hamburger */}
//           <button
//             type="button"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               width: '40px',
//               height: '24px',
//               padding: '0.25rem 0.75rem',
//               backgroundColor: 'transparent',
//               border: '1px solid rgba(0,0,0,0.1)',
//               borderRadius: '0.25rem',
//               cursor: 'pointer'
//             }}
//             aria-label="Toggle navigation"
//             aria-expanded={isMenuOpen}
//           >
//             <div style={{
//               position: 'relative',
//               width: '100%',
//               height: '100%'
//             }}>
//               <span style={{
//                 position: 'absolute',
//                 top: '0',
//                 left: '0',
//                 width: '100%',
//                 height: '2px',
//                 backgroundColor: '#212529'
//               }}></span>
//               <span style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '0',
//                 width: '100%',
//                 height: '2px',
//                 backgroundColor: '#212529',
//                 transform: 'translateY(-50%)'
//               }}></span>
//               <span style={{
//                 position: 'absolute',
//                 bottom: '0',
//                 left: '0',
//                 width: '100%',
//                 height: '2px',
//                 backgroundColor: '#212529'
//               }}></span>
//             </div>
//           </button>
          
//           {/* Menu principal */}
//           <div style={{
//             display: isMenuOpen ? 'flex' : 'none',
//             flexBasis: '100%',
//             flexGrow: 1,
//             alignItems: 'center',
//             flexDirection: 'column',
//             width: '100%',
//             marginTop: '0.5rem',
//             paddingTop: '0.5rem',
//             borderTop: '1px solid #e9ecef'
//           }}>
//             {/* Liste de navigation */}
//             <ul style={{
//               display: 'flex',
//               flexDirection: 'column',
//               paddingLeft: 0,
//               marginBottom: '1rem',
//               listStyle: 'none',
//               width: '100%'
//             }}>
//               <li style={{ marginBottom: '0.5rem' }}>
//                 <a href="#" style={{
//                   display: 'block',
//                   padding: '0.5rem 0',
//                   color: 'rgba(0,0,0,0.9)',
//                   textDecoration: 'none',
//                   fontWeight: 'bold'
//                 }}>
//                   Home <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>(current)</span>
//                 </a>
//               </li>
//               <li style={{ marginBottom: '0.5rem' }}>
//                 <a href="#" style={{
//                   display: 'block',
//                   padding: '0.5rem 0',
//                   color: 'rgba(0,0,0,0.5)',
//                   textDecoration: 'none'
//                 }}>
//                   Link
//                 </a>
//               </li>
//               <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
//                 <a 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setIsDropdownOpen(!isDropdownOpen);
//                   }}
//                   style={{
//                     display: 'block',
//                     padding: '0.5rem 0',
//                     color: 'rgba(0,0,0,0.5)',
//                     textDecoration: 'none'
//                   }}
//                   aria-haspopup="true"
//                   aria-expanded={isDropdownOpen}
//                 >
//                   Dropdown ▼
//                 </a>
//                 <div style={{
//                   display: isDropdownOpen ? 'block' : 'none',
//                   position: 'static',
//                   padding: '0.5rem 0',
//                   marginTop: '0.125rem',
//                   marginLeft: '1rem',
//                   backgroundColor: '#fff',
//                   borderRadius: '0.25rem'
//                 }}>
//                   <a href="#" style={{
//                     display: 'block',
//                     width: '100%',
//                     padding: '0.25rem 1.5rem',
//                     clear: 'both',
//                     textAlign: 'inherit',
//                     whiteSpace: 'nowrap',
//                     backgroundColor: 'transparent',
//                     border: 0,
//                     color: '#212529',
//                     textDecoration: 'none'
//                   }}>Action</a>
//                   <a href="#" style={{
//                     display: 'block',
//                     width: '100%',
//                     padding: '0.25rem 1.5rem',
//                     clear: 'both',
//                     textAlign: 'inherit',
//                     whiteSpace: 'nowrap',
//                     backgroundColor: 'transparent',
//                     border: 0,
//                     color: '#212529',
//                     textDecoration: 'none'
//                   }}>Another action</a>
//                   <div style={{
//                     height: 0,
//                     margin: '0.5rem 0',
//                     overflow: 'hidden',
//                     borderTop: '1px solid #e9ecef'
//                   }}></div>
//                   <a href="#" style={{
//                     display: 'block',
//                     width: '100%',
//                     padding: '0.25rem 1.5rem',
//                     clear: 'both',
//                     textAlign: 'inherit',
//                     whiteSpace: 'nowrap',
//                     backgroundColor: 'transparent',
//                     border: 0,
//                     color: '#212529',
//                     textDecoration: 'none'
//                   }}>Something else here</a>
//                 </div>
//               </li>
//               <li style={{ marginBottom: '0.5rem' }}>
//                 <a href="#" style={{
//                   display: 'block',
//                   padding: '0.5rem 0',
//                   color: 'rgba(0,0,0,0.3)',
//                   textDecoration: 'none',
//                   pointerEvents: 'none',
//                   cursor: 'default'
//                 }}>
//                   Disabled
//                 </a>
//               </li>
//             </ul>
            
//             {/* barre de recherche */}
//             <form style={{
//               display: 'flex',
//               flexWrap: 'nowrap',
//               alignItems: 'center',
//               width: '100%',
//               marginBottom: '0.5rem'
//             }}>
//               <input 
//                 type="search" 
//                 placeholder="Search" 
//                 aria-label="Search"
//                 style={{
//                   display: 'block',
//                   width: '100%',
//                   height: 'calc(1.5em + 0.75rem + 2px)',
//                   padding: '0.375rem 0.75rem',
//                   fontSize: '1rem',
//                   fontWeight: 400,
//                   lineHeight: 1.5,
//                   color: '#495057',
//                   backgroundColor: '#fff',
//                   backgroundClip: 'padding-box',
//                   border: '1px solid #ced4da',
//                   borderRadius: '0.25rem',
//                   marginRight: '0.5rem'
//                 }}
//               />
//               <button 
//                 type="submit"
//                 style={{
//                   display: 'inline-block',
//                   fontWeight: 400,
//                   color: '#28a745',
//                   textAlign: 'center',
//                   verticalAlign: 'middle',
//                   userSelect: 'none',
//                   backgroundColor: 'transparent',
//                   border: '1px solid #28a745',
//                   padding: '0.375rem 0.75rem',
//                   fontSize: '1rem',
//                   lineHeight: 1.5,
//                   borderRadius: '0.25rem',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </nav>
//       );
// }

// export default NavBar;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#212529',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;