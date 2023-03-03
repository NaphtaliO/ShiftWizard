import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Employee from './pages/Employee';
import { logIn } from './state_management/userSlice';
import { useEffect } from 'react';
import Profile from './pages/Profile';

const MainNav = () => {
    //this is the user made global
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch(logIn(user))
        }
    }, [dispatch])

    const user = useSelector((state) => state.user.value);

    return (
        <BrowserRouter>
            <Navbar />
            <div className="pages">
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Employee /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={user ? <Profile/> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default MainNav;