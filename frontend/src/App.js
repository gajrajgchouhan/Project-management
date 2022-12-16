// // import logo from './logo.svg';
// import './App.css';
// import Login from './components/Login';
// // import Signup from './pages/Signup';

// import React from 'react' 
// import FileRoutes from './Routes';

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
    
//   );
// }

// export default App;
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
    
  );
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


export default App;
