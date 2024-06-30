import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'


function Storage({inv}) {
    return (
        <div>
            <Card style={{ width: '40vh', height: '40vh' }}>
                <Card.Header>Storage</Card.Header>
                <Card.Body>
        
        
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        
          
                    </div>
                    <ListGroup variant='flush' >
                        <ListGroupItem>Scrap: {inv.scrap}</ListGroupItem>
                        <ListGroupItem>Tier 1 Metals: {inv.t1Metal.toFixed(2)}</ListGroupItem>
                        <ListGroupItem>Tier 2 Metals: {inv.t2Metal.toFixed(2)}</ListGroupItem>
                        <ListGroupItem>Tier 3 Metals: {inv.t2Metal.toFixed(2)}</ListGroupItem>
          

                    </ListGroup>
              
                </Card.Body>
          
            </Card>
        </div>
    )
}

export default Storage