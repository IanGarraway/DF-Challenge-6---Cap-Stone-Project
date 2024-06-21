import React, {useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import { useCookies } from 'react-cookie';


import AccountService from '../service/AccountService';
//import { useNavigate } from "react-router-dom";




const LoginComponent = ({ setUser }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const username = useRef();
    const password = useRef();
    // const navigateTo = useNavigate();
    // const [cookies, setCookie] = useCookies(['username'])
    

    const handleSubmit = async(target) => {
        target.preventDefault();
        const formData = {
            username: username.current.value,
            password: password.current.value
        }
        try {
            
        
        const response = await AccountService.login(formData);
        
            
            if (response.status === 200) {
                setErrorMessage("");
                // setUser(response.data.username);
                // setCookie('username', response.data.username, {path: '/', maxAge:86400})
                // navigateTo("/");
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
        <>
            <Form onSubmit={handleSubmit}>
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
        
        </>
    );
}

export default LoginComponent;