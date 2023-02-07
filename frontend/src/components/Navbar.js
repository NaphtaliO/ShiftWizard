import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogOut";
// import { Box, AppBar, Button, IconButton, Typography, Toolbar} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const user = useSelector((state) => state.user.value)
    const { logout } = useLogout();

    return (<>

        <nav className="navbar navbar-expand-lg ">
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
        </nav>
        {/* <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {user ?
                        <>
                            <Button color="inherit">{user.email}</Button>
                        </>
                        :
                        <>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Signup</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box> */}

    </>
    );
}

export default Navbar;