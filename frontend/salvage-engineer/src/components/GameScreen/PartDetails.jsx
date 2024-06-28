import React from 'react'
import { Card } from 'react-bootstrap';

import typeNames from "../../data/typeName.data.json";



function PartDetails({ part, isSelected }) {  
  const logoPath = `logos/${part.mlogo}`
  console.log(isSelected,`type: ${part.type}`);
  let variant = "dark"
  if(isSelected){variant= "warning"}
  
  return (
    <Card bg={variant} text={'white'} style={{ width: '18vh', height: '18vh', alignItems: 'center', justifyContent:'center' }}>
      <Card.Img src={logoPath} style={{ width: '17vh', height: '17vh' }}  />
      <Card.ImgOverlay style={{ padding: 0 }}>
        <Card.Header style={{ fontSize: "1.5vh" }}> {part.name} </Card.Header>
        
        <Card.Footer style={{ fontSize: "1.5vh" }}>{typeNames[part.type]}</Card.Footer>
      
      </Card.ImgOverlay>
    </Card>
  )
}

export default PartDetails