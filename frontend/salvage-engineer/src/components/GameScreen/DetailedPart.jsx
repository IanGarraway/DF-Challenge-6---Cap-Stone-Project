import React from 'react'
import { Card, CardImg, ListGroup, ListGroupItem } from 'react-bootstrap'

import typeNames from "../../data/typeName.data.json";

function DetailedPart({ part }) {
  const logoPath = `logos/${part.mlogo}`;
  return (
    <Card style={{ width: '40vh', height: '40vh' }}>
      <Card.Header>{part.name}</Card.Header>
      <Card.Body>
        
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Card.Title style={{ fontSize: '1.5vh' }}>Type: {typeNames[part.type]}</Card.Title>
            Manufacturer:
            {part.manufacturer}
          </div>
          <CardImg src={logoPath} style={{ width: '10vh', height: '10vh' }} />
        </div>
        <ListGroup variant='flush' center>
          {part.grindSpeed && <ListGroupItem>Grind Speed: {part.grindSpeed}</ListGroupItem>}
          {part.grindStr && <ListGroupItem>Grind Strength: {part.grindStr}</ListGroupItem>}
          {part.grindVol && <ListGroupItem>Grind Volume: {part.grindVol}</ListGroupItem>}
          {part.smeltSpd && <ListGroupItem>Smelt Speed: {part.smeltSpd}</ListGroupItem>}
          {part.smeltTier && <ListGroupItem>Smelt Tier: {part.smeltTier}</ListGroupItem>}
          {part.maxQual && <ListGroupItem>Maximum Quality: {part.maxQual}</ListGroupItem>}
          {part.findTime && <ListGroupItem>Part Location speed: {part.findTime}</ListGroupItem>}
          {part.speed && <ListGroupItem>Speed: {part.speed}</ListGroupItem>}
          {part.gathVol && <ListGroupItem>Gather Volume: {part.gathVol}</ListGroupItem>}
          {part.gathSpd && <ListGroupItem>Grind Speed: {part.gathSpd}</ListGroupItem>}

        </ListGroup>
              
      </Card.Body>
          
    </Card>
  )
}

export default DetailedPart