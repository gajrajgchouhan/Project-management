import React from "react";

import { useNavigate, useLocation } from 'react-router-dom';



import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Feed from "./components/pages/Feed";
import Projects from "./components/pages/Projects";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import MyChat from "./components/pages/MyChat";
import Navbar from "./components/nav/Navbar";

const App = () => {
	

    return (
		<>
		
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<div>/</div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route
                    path="/feed"
                    element={
                        <ProtectedPage>
                            <Feed />
                        </ProtectedPage>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <ProtectedPage>
                            <MyChat />
                        </ProtectedPage>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <ProtectedPage>
                            <Projects />
                        </ProtectedPage>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedPage>
                            <Profile />
                        </ProtectedPage>
                    }
                />
            </Route>
        </Routes>
		</>
    );
};

function Layout() {
    return (
        <div>
            <AuthStatus />
            <Outlet />
        </div>
    );
}

function AuthStatus() {
    let auth = useAuth();
    if (!auth.user) {
        return <Navigate to="/login" replace />;
    } else {
        return <Navbar />;
    }
}

function ProtectedPage({ children }) {
    let auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default App;
