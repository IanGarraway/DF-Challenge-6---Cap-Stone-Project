import React, {useState} from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import AdminTableInfo from './AdminTableInfo.jsx';
import AdminPromote from './AdminPromote.jsx';
import AdminDelete from './AdminDelete.jsx'


const AdminTableLine = ({ account, getAccounts }) => {

    const [activeTab, setActiveTab] = useState("info");

    let variant = "light";
    let textVariant = "dark"
    if (account.admin) { variant = "info"; textVariant = "light" }

  return (
      <div className='AdminTableLine'>
          <Card bg={variant} text={textVariant} >
              <Card.Header data-testid={"adminAccount"}>{account.userName} {(account.admin && "(admin account)" )}</Card.Header>
              <Tabs
                  variant="pills"
                  activeKey={activeTab}
                  id="AdminTableLineTab"
                  className='mb-3'
                  onSelect={(selectedTab)=> setActiveTab(selectedTab)}
              >
                  <Tab eventKey="info" title="Info">
                      <AdminTableInfo account={account} />
                  </Tab>
                  <Tab eventKey="delete" title="Delete" >
                      <AdminDelete account={account} getAccounts={getAccounts} setActiveTab={setActiveTab} />
                  </Tab>
                  <Tab eventKey="promote" title="Promote" disabled={account.admin} data-testid={"promoteTab"} >
                      <AdminPromote account={account} getAccounts={getAccounts} setActiveTab={setActiveTab} />
                  </Tab>
              </Tabs>
          </Card>

    </div>
  )
}

export default AdminTableLine