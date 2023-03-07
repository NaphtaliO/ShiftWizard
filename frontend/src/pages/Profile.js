import React, { useState } from 'react';
import {  Avatar, Button, Container, Grid, Paper, TextField, ThemeProvider, createTheme } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../state_management/userSlice';

const theme = createTheme();

const Profile = () => {
    const user = useSelector((state) => state.user.value);
    const [name, setName] = useState(user.name);
    const [email] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const dispatch = useDispatch();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/editOrganisation/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ name, address }),

            })
            const json = await response.json();
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                alert(json.message);
                const newUser = { ...json, token: user.token }
                //save the user to local storage
                localStorage.setItem('user', JSON.stringify(newUser))

                dispatch(logIn(json))
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="profile">
            <div className="container">
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                <Avatar src="/broken-image.jpg"
                                    sx={{ width: 120, height: 120 }}/>
                            </div>
                            
                            <React.Fragment>
                                <form onSubmit={handleSubmit}>
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
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address"
                                            name="address"
                                            label="Address"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, ml: 'auto' }}
                                >
                                    Save
                                    </Button>
                                </form>
                            </React.Fragment>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </div>
        
    </div> );
}
 
export default Profile;