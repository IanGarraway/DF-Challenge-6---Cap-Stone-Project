import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import dotenv from 'dotenv';


import Login from './pages/Login';

import './App.css'
import AccountManagement from './pages/AccountManagement';




function App() {  

  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  

  useEffect(() => {
    const cookie = cookies.user;
    if (cookie != undefined) {
      setUser(cookie);      
    }
  }, [cookies.user]);

  return (
    <>
      <div className='salvageEngineer'>

        <div className='routesContainer'>
          <Routes>
            <Route
              path="/Login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route
              path="/"
              element={<AccountManagement />}            
            />
            <Route
              path="/accountManagement"
              element={<AccountManagement />}            
            />

          </Routes>
          {!user&&<Navigate to="/Login" />}

        </div>

      </div>
      
    </>
  )
}

export default App
