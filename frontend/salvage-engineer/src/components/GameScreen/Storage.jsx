import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'


function Storage({ inv }) {
    
    const scrapValue = inv.scrap !== undefined && inv.scrap !== null ? inv.scrap.toFixed(2) : "0.00";
    const t1Value = inv.t1Metal !== undefined && inv.t1Metal !== null ? inv.t1Metal.toFixed(2) : "0.00";
    const t2Value = inv.t2Metal !== undefined && inv.t2Metal !== null ? inv.t2Metal.toFixed(2) : "0.00";
    const t3Value = inv.t3Metal !== undefined && inv.t3Metal !== null ? inv.t3Metal.toFixed(2) : "0.00";
    return (
        <div>
            <Card style={{ width: '40vh', height: '40vh' }}>
                <Card.Header>Storage</Card.Header>
                <Card.Body>
        
        
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        
          
                    </div>
                    <ListGroup variant='flush' >
                        <ListGroupItem>Scrap: {scrapValue}</ListGroupItem>
                        <ListGroupItem>Tier 1 Metals: {t1Value}</ListGroupItem>
                        <ListGroupItem>Tier 2 Metals: {t2Value}</ListGroupItem>
                        <ListGroupItem>Tier 3 Metals: {t3Value}</ListGroupItem>
          

                    </ListGroup>
              
                </Card.Body>
          
            </Card>
        </div>
    )
}

export default Storage