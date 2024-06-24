import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import * as formik from 'formik';
import * as Yup from 'yup'

import AccountService from '../service/AccountService';


const ChangePassword = () => {

    const { Formik } = formik;
    const [success, setSuccess] = useState(false);
        
    const schema = Yup.object().shape({
        
        newPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must be at least 8 characters, have at least 1 upper case, 1 lower case, 1 number and 1 special character' })
            .required('Required'),
        oldPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must be at least 8 characters, have at least 1 upper case, 1 lower case, 1 number and 1 special character' })
            .required('Required'),
        
        }); 

    
    return (
        <div className='changePassword'>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const response = await AccountService.changePassword(values.oldPassword, values.newPassword);

                        if (response.status === 200) {
                            setSuccess(true);
                            resetForm();
                        }
                    } catch (e) {
                        console.error("There was an error changing the password", e)
                    }
                    setSubmitting(false);
                }}
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h2>Change Password</h2>
                        {success && <Alert key={success} variant={success}>Password Changed</Alert>}
                        <Row>
                            <Col xs={8}>
                                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                                    <Form.Label column sm={3}>Original </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Enter password"
                                            value={values.oldPassword}
                                            onChange={handleChange}
                                            isValid={touched.oldPassword && !errors.oldPassword}
                                            isInvalid={touched.oldPassword && !!errors.oldPassword}
                                            data-testid={"oldPassword"}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                                    <Form.Label column sm={3}>New</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="newPassword"
                                            value={values.newPassword}
                                            onChange={handleChange}
                                            isValid={touched.newPassword && !errors.newPassword}
                                            isInvalid={touched.newPassword && !!errors.newPassword}
                                            data-testid={"newPassword"}
                                        />
                        
                                        <Form.Text className="text-muted">
                                            Must at least 8 characters long.
                                            and contain at least 1 upper case,
                                            1 lower case, 1 number, and 1 special
                                        </Form.Text>
                                    </Col>
                    
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit" data-testid={"cpButton"}>
                                    Change Password
                                </Button>
                            </Col>
                        </Row>
            
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ChangePassword;