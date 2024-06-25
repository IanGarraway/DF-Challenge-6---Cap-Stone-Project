import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import AccountService from '../service/Account.Service';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const DeleteAccount = () => {
    const [confirmDelete, setConfirmDelete] = useState(true);
    const password = useRef();
    const navigateTo = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const handleChange = (target) => {        
        setConfirmDelete(!(target.target.checked));
    }

    const handleSubmit = async (target) => {
        target.preventDefault();
        try {
            const reponse = await AccountService.deleteAccount(password.current.value);

            if (reponse.status === 200) {
                setCookie('user', "", { path: '/', maxAge: 0 });
                navigateTo("/");
            } else {
                console.log("Delete Account Failed");            
            }
        } catch (error) {
            console.error("Error during account deletion: ", error);
        }
        
    }
    return (
        <div className="deleteAccount">
            <Form onSubmit={handleSubmit}>
                <h2>Account Deletion</h2>
                <Row>
                    <Col></Col>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="switch"
                            label="Confirm you wish to delete your account. This is a permanent decision and can not be undone."
                            id='confirmDelete'
                            onChange={handleChange}
                            data-testid={"deleteSwitch"}

                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col xs={8}>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={3}>Password</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password to delete"
                                    ref={password}
                                    data-testid={"deletePassword"}
                                />
                                <Form.Text className="text-muted">
                                    enter your password to confirm you wish to delete your account
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={confirmDelete}
                            data-testid={"deleteButton"}
                        >
                            Delete Account
                        </Button>
                    </Col>
                
                </Row>
            </Form>
        </div>
        
    );
}

export default DeleteAccount;