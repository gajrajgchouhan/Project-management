import React from "react";
import "./App.css";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/pages/Feed";
import Projects from "./components/pages/Projects";
import Profile from "./components/pages/Profile";
import MyChat from "./components/pages/MyChat";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Chat" element={<MyChat />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
