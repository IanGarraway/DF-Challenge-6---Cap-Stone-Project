import React from 'react'
import { Card, CardImg, ListGroup, ListGroupItem } from 'react-bootstrap'

import typeNames from "../../data/typeName.data.json";

function DetailedPart({ part }) {
  if (!part) {return (<>loading... </>)}
  let logoPath = `logos/heavyWorldLogo.png`;
   logoPath = part && `logos/${part.mlogo}`;
  
  return (
    <Card style={{ width: '30vh', height: '30vh' }}>
      <Card.Header>{part.name}</Card.Header>
      <Card.Body>
        
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Card.Title style={{ fontSize: '1.5vh' }}>Type: {typeNames[part.type]}</Card.Title>
            Manufacturer:
            <br />{part.manufacturer}
          </div>
          <CardImg src={logoPath} style={{ width: '8vh', height: '8vh' }} />
        </div>
        <ListGroup variant='flush' >
          {part.grindSpeed>-1 && <ListGroupItem>Grind Speed: {part.grindSpeed}</ListGroupItem>}
          {part.grindStr>-1 && <ListGroupItem>Grind Strength: {part.grindStr}</ListGroupItem>}
          {part.grindVol>-1 && <ListGroupItem>Grind Volume: {part.grindVol}</ListGroupItem>}
          {part.smeltSpd>-1 && <ListGroupItem>Smelt Speed: {part.smeltSpd}</ListGroupItem>}
          {part.smeltTier>-1 && <ListGroupItem>Smelt Tier: {part.smeltTier}</ListGroupItem>}
          {part.maxQual>-1 && <ListGroupItem>Maximum Quality: {part.maxQual}</ListGroupItem>}
          {part.findTime>-1 && <ListGroupItem>Part Location speed: {part.findTime}</ListGroupItem>}
          {part.speed>-1 && <ListGroupItem>Speed: {part.speed}</ListGroupItem>}
          {part.gathVol>-1 && <ListGroupItem>Gather Volume: {part.gathVol}</ListGroupItem>}
          {part.gathSpd>-1 && <ListGroupItem>Gather Speed: {part.gathSpd}</ListGroupItem>}

        </ListGroup>
              
      </Card.Body>
          
    </Card>
  )
}

export default DetailedPart