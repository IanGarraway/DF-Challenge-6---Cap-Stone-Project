import React from 'react'
import { Spinner, Card } from 'react-bootstrap'

function ConnectingSpinner() {
    return (        
            <Card bg={"dark"} text={'white'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
                <div>Please wait, while we create your account</div>
                <Spinner animation="grow" variant="success"  />
            </Card>        
    )
}

export default ConnectingSpinner