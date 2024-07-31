import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import AdminService from "../../service/Admin.Service.js"

function AdminDelete({account, getAccounts, setActiveTab}) {

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [errorText, setErrorText] = useState("");

  if (deleted) {
    return (
      <div className='d-grid gap-2'>
        Deleted
      </div>
    )
  }

  const handleChange = (target) => {
    setConfirmDelete(target.target.checked);
    
  }

  const handleSubmit = async (target) => {
    target.preventDefault();    
    try {
      
      const response = await AdminService.delete(account._id);

      if (response.status === 200) {
        setDeleted(true);
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
          label="Confirm you wish to delete this account"
          onChange={handleChange}
          data-testid={"adminDeleteSwitch"}
          key={account._id}
        />
      
        <div className='errorText'>
          {errorText}
        </div>
        <div className='d-grid gap-2'>
          <Button key={account._id} variant='danger' type='submit' size="lg" disabled={!(confirmDelete)} data-testid={"adminDeleteButton"} >
            Delete this Account
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AdminDelete