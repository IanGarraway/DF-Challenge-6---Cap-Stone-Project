import React, {useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';


import AccountService from '../service/Account.Service';
import { useNavigate } from "react-router-dom";




const LoginComponent = ({ setUser }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const username = useRef();
    const password = useRef();
    const navigateTo = useNavigate();
    const [cookies, setCookie] = useCookies(['user'])
    

    const handleSubmit = async(target) => {
        target.preventDefault();        
        try {
            
        
        const response = await AccountService.login(username.current.value, password.current.value);        
            
            if (response.status === 200) {
                setErrorMessage("");
                const userData = { "username": response.data.username, ...(response.data.admin && { "admin": true }) }
                setUser(userData);
                setCookie('user', userData, { path: '/', maxAge: 86400 });
                
                navigateTo("/");
        } else {
                console.error("Login failed");
                setErrorMessage("Login failed")
                
                
            }
        } catch (error) {
            console.error("Error during login: ", error);
            setErrorMessage("Login failed")
        }
    }
    return (
        <div style={{minWidth: "260px"}}>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" ref={username} data-testid={"loginUsername"} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={password} data-testid={"loginPassword"} />
                </Form.Group>
            
                <Button variant="primary" type="submit" data-testid={"loginButton"}>
                    Submit
                </Button>
            </Form >
            <p id='error'>{errorMessage}</p>
        
        </div>
    );
}

export default LoginComponent;