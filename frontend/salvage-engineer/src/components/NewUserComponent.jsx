import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, Alert, Modal } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip  from 'react-bootstrap/Tooltip';

import * as formik from 'formik';
import * as Yup from 'yup'

import AccountService from '../service/Account.Service';
import ConnectingSpinner from './sideComponents/ConnectingSpinner';
import ErrorBox from './sideComponents/ErrorBox';

const NewUserComponent = ({setActiveTab}) => {
    const { Formik } = formik;
    const [success, setSuccess] = useState(false);
    const [showConnecting, setShowConnecting] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleErrorClose = () => setShowError(false);
        
    const schema = Yup.object().shape({
        username: Yup.string()
            .max(15, 'Must be 15 characters of less')
            .required('Required'),
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must be at least 8 characters, have at least 1 upper case, 1 lower case, 1 number and 1 special character' })
            .required('Required'),
        terms: Yup.bool().required('Terms must be accepted').oneOf([true], 'Terms must be accepted'),
    }); 
    
    const Link = ({id, children, title }) => (
        <OverlayTrigger overlay={<Tooltip id={id}><Terms /></Tooltip>}>
            <a href="#">{children}</a>
        </OverlayTrigger>
    )

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
            
                    try {
                        setShowConnecting(true);
                        const response = await AccountService.newUser(values.username, values.password, values.name, values.email)
                        setShowConnecting(false);
                        if (response.status === 201) {
                            setSuccess(true);
                            resetForm();
                            setActiveTab("Login");
                        }
                    } catch (e) {
                        console.error("There was an error creating the account", e);
                        setErrorMsg(e.message);
                        setShowError(true);
                    }
                    setSubmitting(false);
                }}
                initialValues={{
                    username: '',
                    name: '',
                    email: '',
                    password: '',
                    terms: false,
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} >
                        {success && <Alert key={success} variant={success}>Account Created</Alert>}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                isValid={touched.username && !errors.username}
                                isInvalid={touched.username && !!errors.username}
                                data-testid={"newUsername"}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={values.name}
                                onChange={handleChange}
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && !!errors.name}
                                data-testid={"newName"}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={touched.email && !!errors.email}
                                data-testid={"newEmail"}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={touched.password && !!errors.password}
                                data-testid={"newPassword"}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
            
                        <Form.Check
                            required
                            label="Agree to the terms and conditions"
                            name="terms"
                            onChange={handleChange}
                            isInvalid={!!errors.terms}
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            data-testid={"newTerms"}
                        />
                        
                        <Button variant="primary" type="submit" data-testid={"newButton"}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className='modalBox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Modal show={showConnecting}
                    data-testid={"createAccountModal"}                  
                    style={{ 
                    }}
                >
                    <ConnectingSpinner />                
                </Modal>
                <Modal show={showError}
                    data-testid={"createAccountError"}
                    onHide={handleErrorClose}
                >
                    <ErrorBox errorMessage={errorMsg} />
                </Modal>
            </div>
        </>
    );
}

export default NewUserComponent;