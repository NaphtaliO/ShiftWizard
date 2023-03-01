import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Roster from './components/Roster';
import Home from './pages/Home';
import Footer from './components/Footer';
import { logIn } from './state_management/userSlice';
import { useEffect } from 'react';
import Employees from './pages/Employees';

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
                        element={user ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/employees"
                        element={user ? <Employees /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/roster/:id"
                        element={user ? <Roster /> : <Navigate to="/login" />}
                    />
                    
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/signup"
                        element={!user ? <Signup /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default MainNav;