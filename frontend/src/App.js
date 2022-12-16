
import React from 'react';
import './App.css';
import Navbar from './components/nav/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './components/pages/Feed';
import Projects from './components/pages/Projects';
import Profile from './components/pages/Profile';
const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/Feed' component={Feed} />
          <Route path='/Projects' component={Projects} />
          <Route path='/Profile' component={Profile} />
        </Routes>
      </Router>
  )
}
// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/login" component={Login} />
//         <Route path="/signup" component={SignUp} />
//         <Navigate from="/" to="/signup" />
//       </Routes>
//     </>
//   );


export default App
