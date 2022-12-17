import React, { useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyChat from "./pages/MyChat";
import Navbar from "./components/nav/Navbar";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/" element={<Layout />}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/chat" element={<MyChat />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

function useAuth() {
    const [s, setS] = useState({});
    return s;
}

function Layout() {
    console.log("in layout");
    const auth = useAuth();
    const loc = useLocation();
    // if (!auth.user) {
    //     console.log("to login");
    //     return <Navigate to="/login" state={{ from: loc }} replace />;
    // }
    console.log("logged in!");
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
