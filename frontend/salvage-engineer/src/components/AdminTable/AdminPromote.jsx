import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import AdminService from "../../service/Admin.Service.js"

function AdminPromote({account, getAccounts, setActiveTab}) {

  const [confirmPromote, setConfirmPromote] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const [errorText, setErrorText] = useState("");

  if (promoted) {
    return (
      <div className='d-grid gap-2'>
        Promoted
      </div>
    )
  }

  const handleChange = (target) => {
    setConfirmPromote(target.target.checked);
    
  }

  const handleSubmit = async (target) => {
    target.preventDefault();    
    try {
      
      const response = await AdminService.promote(account._id);

      if (response.status === 200) {
        setPromoted(true);
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
          key={account._id}
          label="Confirm you wish to promote this account"
          onChange={handleChange}
          data-testid={"promoteSwitch"}
        />
      
        <div className='errorText'>
          {errorText}
        </div>
        <div className='d-grid gap-2'>
          <Button  variant='warning' type='submit' size="lg" disabled={!(confirmPromote)} data-testid={"promoteButton"} >
            Promote this Account to Admin
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AdminPromote