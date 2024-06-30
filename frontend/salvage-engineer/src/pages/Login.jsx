import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Navigate } from 'react-router-dom';


import LoginComponent from '../components/LoginComponent.jsx'
import NewUserComponent from '../components/NewUserComponent.jsx'



 
const Login = ({ user, setUser }) => {      
    const [activeTab, setActiveTab] = useState("Login");

    
    if (user) { return (<Navigate to="/" />); }
        
//     useEffect(() => {
       
//     }, [user])
    
    return (
        <Container fluid>
            
            <div className='loginScreen'>
                <div className="d-flex justify-content-center">
                    <div className='loginBoxes'>
            
                        <Tabs
                            activeKey={activeTab}
                            id="loginScreen"
                            onSelect={(selectedTab) => setActiveTab(selectedTab)}
                    
                            variant='pills'
                        >
                            <Tab eventKey="Login" title="Login">
                                <LoginComponent setUser={setUser} />
                            </Tab>
                            <Tab eventKey="New User" title="New User">
                                <NewUserComponent setActiveTab={setActiveTab} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
           
        </Container>
        
    )
}

export default Login;