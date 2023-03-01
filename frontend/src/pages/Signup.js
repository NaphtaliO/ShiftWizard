import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../state_management/userSlice';
import Copyright from '../components/Copyright';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = createTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/organisation/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, address, email, password }),

            })
            const json = await response.json();
            if (!response.ok) {
                setError(json.message)
            }
            if (response.ok) {
                if (isChecked) {
                    localStorage.setItem('user', JSON.stringify(json))
                }
                dispatch(logIn(json))
            }
            console.log(json);

        } catch (error) {
            console.log(error);
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Organisation Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={(e) => setName(e.target.value)} value={name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    multiline
                                    onChange={(e) => setAddress(e.target.value)} value={address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)} value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />}
                                    label="Remember me"
                                />
                            </Grid>
                        </Grid>
                        {error !== "" ? <div className="error" style={{ color: 'red' }}>
                            <p>{error}</p></div> : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={() => navigate("/login")}>
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}

export default Signup;
