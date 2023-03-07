import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, ThemeProvider, createTheme } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const theme = createTheme();

const ChangePassword = () => {
    const user = useSelector((state) => state.user.value)
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/changePassword/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`    },
                body: JSON.stringify({ currentPassword, newPassword }),

            })
            const json = await response.json();
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                alert(json.message)
                navigate('/profile')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="profile">
            <div className="container">

                <ThemeProvider theme={theme}>

                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <React.Fragment>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="current-password"
                                                name="password"
                                                label="Current Password"
                                                fullWidth
                                                variant="standard"
                                                value={currentPassword}
                                                type='password'
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="new-password"
                                                name="password"
                                                label="New Password"
                                                fullWidth
                                                variant="standard"
                                                value={newPassword}
                                                type='password'
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        style={{ marginLeft: 'auto' }}
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, }}
                                        onClick={() => navigate('/change-password')}
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </React.Fragment>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </div>

        </div>);
}

export default ChangePassword;