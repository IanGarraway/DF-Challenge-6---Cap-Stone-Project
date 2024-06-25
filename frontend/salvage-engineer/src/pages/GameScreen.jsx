import React from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'


function GameScreen({ user, setUser }) {
    
  return (
      <>
          <Container fluid>
              <Row>
                  <Col><Button size='lg'></Button></Col>
                  <Col></Col>
                  <Col><Button></Button></Col>
                  <Col></Col>
                  <Col><Button></Button></Col>
                  
              </Row>
              <Row>
                  <Col><Button></Button></Col>
                  <Col><Button></Button></Col>
                  <Col></Col>
                  <Col><Button></Button></Col>
                  <Col><Button></Button></Col>
              </Row>
              <Row>
                  <Col><Button></Button></Col>
                  <Col><Button></Button></Col>
                  <Col><Button></Button></Col>
                  <Col><Button></Button></Col>
                  <Col></Col>
              </Row>
              <Row>
                  <Col><Button></Button></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col><Button></Button></Col>
              </Row>
              <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col><Button></Button></Col>
              </Row>
              
          </Container>
          
    </>
  )
}

export default GameScreen