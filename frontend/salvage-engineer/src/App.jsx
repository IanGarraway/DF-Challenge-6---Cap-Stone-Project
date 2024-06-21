import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import dotenv from 'dotenv';


import Login from './pages/Login';

import './App.css'


function App() {

  dotenv.config;

  const [user, setUser] = useState();
  console.log(process.env.REACT_APP_API_URL,`<--React`);
  console.log(process.env.VITE_API_URL, `<--VITE`);
  console.log(import.meta.env.VITE_API_URL, `<--metavite`);

  return (
    <>
      <div className='salvageEngineer'>

        <div className='routesContainer'>
          <Routes>
            <Route
              path="/Login"
              element={<Login setUser={setUser} />}
            />

          </Routes>
          {user==null&&<Navigate to="/Login" />}

        </div>

      </div>
      
    </>
  )
}

export default App
