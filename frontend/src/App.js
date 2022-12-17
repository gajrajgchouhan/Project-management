import React from "react";
import "./App.css";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/pages/Feed";
import Projects from "./components/pages/Projects";
import Profile from "./components/pages/Profile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MyChat from "./components/pages/MyChat";

const App = () => {
    return (
        <div>
            <Navbar />
            <switch>
                <Routes>
                    <Route path="/Chat" element={<MyChat />} />
                    <Route path="/Feed" component={Feed} />
                    <Route path="/Projects" component={Projects} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Login" component={Login} />
                    <Route path="/SignUp" component={SignUp} />
                </Routes>
            </switch>
        </div>
    );
};

export default App;
