import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


import Login from './pages/Login';

import './App.css'


function App() {

  const [user, setUser] = useState();
  

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
