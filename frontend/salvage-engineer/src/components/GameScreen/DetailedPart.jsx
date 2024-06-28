import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

import typeNames from "../../data/typeName.data.json";

function DetailedPart({part}) {
  return (
      <Card>
          <Card.Header>{part.name}</Card.Header>
          <Card.Body>
              <ListGroup variant='flush'>
                  <ListGroup.Item>Manufacturer: {part.manufacturer}</ListGroup.Item>
                  <ListGroup.Item>Type: {typeNames[part.type]}</ListGroup.Item>
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