import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLogout } from "../hooks/useLogOut";
import { Box, AppBar, Button, IconButton, Typography, Toolbar, Menu, Container, Avatar, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Dashboard', 'Employees', 'Chat'];

const Navbar = () => {
    const user = useSelector((state) => state.user.value)
    const { logout } = useLogout();
    const navigate = useNavigate(); 
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (<>

        {/* <nav className="navbar navbar-expand-lg ">
            <div className="container nav-container">
                <Link to="/" className='navbar-brand'>
                    <h2 className='nav-text web-title'>Team Project</h2>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end navbar-nav me-auto mb-2 mb-lg-0" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-end ">
                        {user ?
                            <>
                                <li className="nav-item" style={{ marginRight: 20, alignSelf: 'center' }}>
                                    <h3 style={{ color: 'white' }}>{user.email}</h3>
                                </li>
                                <li className="nav-item nav-button">
                                    <Link className='nav-link active link-text' onClick={logout}>Logout</Link>
                                </li>
                            </>
                            : <>
                                <li className="nav-item nav-button">
                                    <Link className='nav-link active link-text' to="/login">Login</Link>
                                </li>
                                <li className="nav-item nav-button">
                                    <Link className='nav-link active link-text ' to="/signup">Signip</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav> */}
        <div className="nav" style={{
            marginBottom: 80
        }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                             //noWrap
                            // component="a"
                            // href="/"
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
                            Project
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
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
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        {user ?
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                        {/* <Button onClick={() => navigate('/')}
                                            sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}>
                                            dashboard
                                    </Button> */}
                                    <Button onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}>
                                        Chat
                                    </Button>
                                    
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar>
                                                {user.name.charAt(0).toUpperCase()}
                                            </Avatar>
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

                                        <MenuItem onClick={() => {
                                            navigate('/profile');
                                            handleCloseUserMenu()
                                        }}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={logout}>
                                            <Typography color={'red'} textAlign="center">Logout</Typography>
                                        </MenuItem>

                                    </Menu>
                                </Box>
                            </>
                            :
                            <div className='nav-buttons'>
                                <Button color="inherit" onClick={() => navigate('login')}>Login</Button>
                            </div>

                        }

                    </Toolbar>
                </Container>
            </AppBar>
        </div>


    </>
    );
}

export default Navbar;