import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Modal } from 'react-bootstrap';

import Part from '../components/GameScreen/Part.jsx';
import GameService from '../service/Game.Service.js';
import Inventory from '../components/GameScreen/Inventory.jsx';


function GameScreen() {

    var r = document.querySelector('.salvageEngineer')
    r.style.setProperty('background-image','url("backgrounds/background3.png")' )      

    const [gameData, setGameData] = useState();
    const [showInv, setShowInv] = useState(false);
    const [itemFocus, setItemFocus] = useState("none");

    const handleClose = () => setShowInv(false);
    const handleShow = () => setShowInv(true);

    const getData = async () => {
        try {
            const response = await GameService.getData();
            if (response.status === 200) {
                setGameData(response.data);
            }
        } catch (e) {
            console.error(e.message);
        }
    }    

    useEffect(() => {
        getData();
    }, []);

    if (!gameData) {
        return (
            <div className="loading">                
                <Spinner animation="border" variant='light'>Loading</Spinner>
            </div>);
    }
    const { inventory, equipment, fabrication, partsStorage, stats, upgrades } = gameData;
    
  return (
      <div className='gameScreen'>
          <Container fluid>
              <Row>
                  <Col><Part part={equipment.magnetMotor} symbol={"magnetCraneIcon.png"} slot={"magnetMotor"} role={"Magnet Motor"}  /></Col>                  
                  <Col><Part part={fabrication.grinderMotor} symbol={"grinderIcon.png"} slot={"grinderMotor"} role={"Grinder Motor"} /></Col>
                  <Col></Col>
                  <Col><Part part={fabrication.grinderGear} symbol={"grinderIcon.png"} slot={"grinderGear" } role={"Grinder Gears"}/></Col>
                  <Col><Part part={fabrication.smelterHeater} symbol={"smelteryIcon.png"} slot={"smelterHeater" } role={"Smelter Heater"}/></Col>
                  
              </Row>
              <Row>
                  <Col><Part part={equipment.magnetCore} symbol={"magnetCraneIcon.png"} slot={"magnetCore" } role={"Magnet Core"}/></Col>
                  <Col></Col>
                 <Col></Col>
                  <Col></Col>
                  <Col><Part part={fabrication.smelterControl} symbol={"smelteryIcon.png"} slot={"smelterControl" } role={"Smelter Controller"}/></Col>
              </Row>
              <Row>
                  <Col></Col>
                  <Col></Col>
                 <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row>
                  <Col><Part part={equipment.scoopSensor} symbol={"scoopIcon.png"} slot={"scoopSensor" } role={"Scoop Sensor"}/></Col>
                  <Col></Col>
                <Col></Col>
                  <Col></Col>
                  <Col><Part part={equipment.clawScanner} symbol={"clawIcon.png"} slot={"clawScanner" } role={"Claw Scanner"}/></Col>
              </Row>
              <Row>
                  <Col><Part part={equipment.scoopMotor} symbol={"scoopIcon.png"} slot={"scoopMotor" } role={"Scoop Motor"}/></Col>
                  <Col></Col>
                  <Col><Part part={equipment.sensor} symbol={"sensorIcon.png"} slot={"sensor"} role={"Sensor"} /></Col>
                
                  <Col></Col>
                  <Col><Part part={equipment.clawHydrolics} symbol={"clawIcon.png"} slot={"clawHydrolics" } role={"Claw Hydrolics"}/></Col>
              </Row>

              <Button variant="dark" onClick={handleShow}>
                  Inventory
              </Button>

              <Modal show={showInv} onHide={handleClose} size='xl' >
                  <Modal.Header closeButton>
                      <Modal.Title>Parts Storage</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <Inventory gameData={gameData} focus={itemFocus} />
                  </Modal.Body>
              </Modal>
          </Container>
          
    </div>
  )
}

export default GameScreen