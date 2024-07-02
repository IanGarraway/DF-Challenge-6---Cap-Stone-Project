import React, { useState, useRef } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'


import AdminService from "../../service/Admin.Service.js"

function AdminChangePassword({account, getAccounts, setActiveTab}) {

  const [confirmChange, setConfirmChange] = useState(false);  
  const [errorText, setErrorText] = useState("");
  const passwordRef = useRef();
  

  const handleChange = (target) => {
    setConfirmChange(target.target.checked);
    
  }

  const handleSubmit = async (target) => {
    target.preventDefault();    
    try {
            
      const newPassword = passwordRef.current.value;
      const response = await AdminService.changePassword(account._id, newPassword);

      if (response.status === 200) {
        
        getAccounts();
        setErrorText("");
        setActiveTab("info");
        
      }
    } catch (e) {
      console.log(e);
      setErrorText(e.message);
    }
    
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} >
        <Form.Check
          type="switch"          
          label="Confirm you wish to Change the password "
          onChange={handleChange}
          data-testid={"changeSwitch"}
          key={account._id}
        />
        <Form.Group as={Row} className="mb-3" >
          <Form.Label column sm={3}>Password</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              ref={passwordRef}
              data-testid={"adminChangePassword"}
              key={account._id}
            />
            
          </Col>
        </Form.Group>
      
        <div className='errorText'>
          {errorText}
        </div>
        <div className='d-grid gap-2'>
          <Button  variant='warning' type='submit' size="lg" disabled={!(confirmChange)} data-testid={"changeButton"} key={account._id} >
            Change the password
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AdminChangePassword