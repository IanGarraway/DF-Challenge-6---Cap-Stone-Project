import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import dotenv from 'dotenv';


import Login from './pages/Login';

import './App.css'
import AccountManagement from './pages/AccountManagement.jsx';
import Admin from './pages/Admin.jsx';
import GameScreen from './pages/GameScreen.jsx';

import Header from './components/Header.jsx';




function App() {  

  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [backgroundImg, setBackGroundImg] = useState(`url("backgrounds/background1.png`);
  

  useEffect(() => {
    const cookie = cookies.user;
    if (cookie !== undefined) {
      setUser(cookie);      
    }
  }, [cookies.user]);

  return (
    <>
      <div className='salvageEngineer' style={{ backgroundImage: backgroundImg }}>
        {user && <Header user={user} setUser={setUser}/>}

        <div className='routesContainer' >
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login user={user} setUser={setUser} setBackGroundImg={setBackGroundImg} />}
            />
            <Route
              path="/"
              element={user ? <GameScreen setBackGroundImg={setBackGroundImg} /> : <Login user={user} setUser={setUser} setBackGroundImg={setBackGroundImg}/> } 
            />
            <Route
              path="/accountmanagement"
              element={user ? <AccountManagement user ={user} setUser={setUser} setBackGroundImg={setBackGroundImg}/> : <Login user={user} setUser={setUser} setBackGroundImg={setBackGroundImg}/>  }            
            />
            <Route
              path="/admin"
              element={user ? <Admin user ={user} setUser={setUser} setBackGroundImg={setBackGroundImg} /> : <Login user={user} setUser={setUser} setBackGroundImg={setBackGroundImg}/> }
            />

            {/* <Route
            path='/'>

            </Route> */}

          </Routes>          

        </div>

      </div>
      
    </>
  )
}

export default App
