import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function FileRoutes() {

    return (
        <Routes>
            <Route exact path="/Home">
                <Home />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/signup">
                <Signup />
            </Route>
        </Routes>

    );
}

export default FileRoutes;