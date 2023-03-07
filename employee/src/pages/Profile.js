import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, ThemeProvider, createTheme } from '@mui/material/';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Profile = () => {
    const user = useSelector((state) => state.user.value);
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const navigate = useNavigate();

    return (
        <div className="profile">
            <div className="container">

                <ThemeProvider theme={theme}>

                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <div className="change-password" style={{display: 'flex'}}>
                            <Button
                                style={{marginLeft: 'auto'}}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, }}
                                onClick={() => navigate('/change-password')}
                            >
                                Change Password
                            </Button>
                        </div>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <Avatar src="/broken-image.jpg"
                                    sx={{ width: 120, height: 120 }} />
                            </div>

                            <React.Fragment>
                                <form >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Name"
                                                fullWidth
                                                autoComplete="name"
                                                variant="standard"
                                                value={name}
                                                inputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email Address"
                                                fullWidth
                                                autoComplete="email"
                                                variant="standard"
                                                inputProps={{ readOnly: true }}
                                                value={email}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br /><br /><br />
                                </form>
                            </React.Fragment>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </div>

        </div>);
}

export default Profile;