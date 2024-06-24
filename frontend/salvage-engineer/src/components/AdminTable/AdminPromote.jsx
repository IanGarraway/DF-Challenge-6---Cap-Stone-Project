import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function AdminPromote() {

  const [confirmPromote, setConfirmPromote] = useState(false);

  const handleChange = (target) => {
    setConfirmPromote(target.target.checked);
    
  }

  return (
    <div>
      <Form>
        <Form.Check
          type="switch"
          id="confirmPromoteSwitch"
          label="Confirm you wish to promote this account"
          onChange={handleChange}
          data-testid={"promoteSwitch"}
        />

      </Form>
      <div className='d-grid gap-2'>
        <Button variant='warning' size="lg" disabled={!(confirmPromote)} data-testid={"promoteButton"}>
          Promote this Account to Admin
        </Button>
      </div>
    </div>
  )
}

export default AdminPromote