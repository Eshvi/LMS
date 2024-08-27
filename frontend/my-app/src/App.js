import React from 'react';
import RewardPoints from './RewardPoints.js';
import RedeemPoints from './RedeemPoints.js';
import RewardsCatalog from './RewardsCatalog.js';
import Auth from './Auth.js';
import { Route, Routes } from "react-router-dom";
import Product from './Product.js';
import Auth2 from './Auth2.js';
import Login from './Login.js';
import Register from './Register.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // <main className="App">
  return (

    <div className='App'>
      <Routes>
        {/* Routes for signIn and signup pages (unauthenticated access)*/}
        {/* <Route path="/signIn" element={<Auth2><Login /></Auth2>} /> */}
        {/* <Route path="/signUp" element={<Auth2><Register /></Auth2>} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/reward" element={<Auth><RewardPoints /></Auth>} />
        <Route path="/redeem" element={<Auth><RedeemPoints /></Auth>} />
        <Route path="/catalog" element={<Auth><RewardsCatalog /></Auth>} />
        {/* <Route path="/product" element={<Auth><Product /></Auth>} /> */}
        <Route path="/product" element={<Auth><Product /></Auth>} />
      </Routes>
      {/* Catch-all routes for 404 not found */}
    </div>
  );
}
export default App;

// react-router-dom
//react-icons

