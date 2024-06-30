import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

function AdminTableInfo({ account }) {
    
    return (
        <div className='tableInfo'>
            <FloatingLabel
                controlId="floatingData"
                label="Email address"
                className="mb-1"
              
            >
                <Form.Control key={account._id} type="test" placeholder="name@example.com" value={account.email} readOnly data-testid={"adminEmail"} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Name">
                <Form.Control key={account._id} type="string" placeholder="Name" value={account.name} readOnly data-testid={"adminName"}/>
            </FloatingLabel>
          
        </div>
    )
}

export default AdminTableInfo