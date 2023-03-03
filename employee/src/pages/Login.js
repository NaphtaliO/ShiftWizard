import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../state_management/userSlice';
import Copyright from '../components/Copyright';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
    //Todo: add loading
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const theme = createTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //console.log({email, password, isChecked});
            const response = await fetch(`http://roster-app-1-env.eba-myeicz6k.eu-west-1.elasticbeanstalk.com/api/employee/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),

            })
            const json = await response.json();
            if (!response.ok) {
                setError(json.message)
            }
            if (response.ok) {
                //save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                dispatch(logIn(json))
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)} value={email}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        {error !== "" ? <div className="error" style={{ color: 'red' }}>
                            <p>{error}</p></div> : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {/* Forgot password? */}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default Login;