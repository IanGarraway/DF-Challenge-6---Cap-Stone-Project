import React from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import AdminTableInfo from './AdminTableInfo';
import AdminPromote from './AdminPromote';


const AdminTableLine = ({ account }) => {

    let variant = "light";
    let textVariant = "dark"
    if (account.admin) { variant = "info"; textVariant = "light" }

  return (
      <div className='AdminTableLine'>
          <Card bg={variant} text={textVariant} >
              <Card.Header data-testid={"adminAccount"}>{account.userName} {(account.admin && "(admin account)" )}</Card.Header>
            <Tabs variant="pills" defaultActiveKey="info" id="AdminTableLineTab" className='mb-3' >
                  <Tab eventKey="info" title="Info">
                      <AdminTableInfo account={account} />
                  </Tab>
                  <Tab eventKey="delete" title="Delete" >
                      delete
                  </Tab>
                  <Tab eventKey="promote" title="Promote" disabled={account.admin} data-testid={"promoteTab"} >
                      <AdminPromote account={account} />
                  </Tab>
              </Tabs>
          </Card>

    </div>
  )
}

export default AdminTableLine