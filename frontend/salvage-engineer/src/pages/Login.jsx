import { Container } from 'react-bootstrap';
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import LoginComponent from '../components/LoginComponent.jsx'
import NewUserComponent from '../components/NewUserComponent.jsx'




const Login = ({ setUser  }) => {      
        
    
    return (
        <Container fluid>
            
                <div className='loginScreen'>
                    <div className="d-flex justify-content-center">
                        <div className='loginBoxes'>
            
                            <Tabs
                                defaultActiveKey="Login"
                                id="loginScreen"
                    
                                variant='pills'
                            >
                                <Tab eventKey="Login" title="Login">
                                    <LoginComponent setUser={setUser} />
                                </Tab>
                                <Tab eventKey="New User" title="New User">
                                    <NewUserComponent />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
           
        </Container>
        
    )
}

export default Login;