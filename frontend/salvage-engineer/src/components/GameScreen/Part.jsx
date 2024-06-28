import React from 'react'
import { Card, Container } from 'react-bootstrap'


function Part({ part, symbol, slot, role } ) {
    
    const logoPath = `icons/${symbol}`; 
    

    
    return (
        <div>
            <Card style={{
                width: '20vh',
                height: '20vh',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
                padding: "0",
                opacity: "0.8"

            }}>
                <Card.Header style={{ fontSize: "1.5vh"  }}> {role} </Card.Header>
                <Card.Img src={logoPath} style={{height: "50%", width: "50%"}} />
                <Card.Footer style={{fontSize: "1.1vh"  }} >
                    {part.name}                      
                </Card.Footer>                       
                   
            </Card>
        </div>
    );
}

export default Part