import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Logout from "./pages/Logout";
import Navbar from "./components/nav";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                
            </Routes>
            <Footer />
            <br></br>
            <ToastContainer />
        </>
    );
};

function useAuth() {
    const user = useSelector((state) => state.user);
    return user;
}

function Layout() {
    const auth = useAuth();
    const loc = useLocation();
    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: loc }} replace />;
    }
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
