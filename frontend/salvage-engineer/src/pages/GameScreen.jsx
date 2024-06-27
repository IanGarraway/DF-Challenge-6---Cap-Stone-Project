import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

import Part from '../components/GameScreen/Part.jsx';
import GameService from '../service/Game.Service.js';


function GameScreen() {

    var r = document.querySelector('.salvageEngineer')
    r.style.setProperty('background-image','url("backgrounds/background3.png")' )      

    const [gameData, setGameData] = useState();

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
                  
                  <Col><Part part={fabrication.grinderMotor} symbol={"grinderIcon.png"} slot={"grinderMotor" } role={"Grinder Motor"}/></Col>
                  <Col><Part part={fabrication.grinderGear} symbol={"grinderIcon.png"} slot={"grinderGear" } role={"Grinder Gears"}/></Col>
                  <Col><Part part={fabrication.smelterHeater} symbol={"smelteryIcon.png"} slot={"smelterHeater" } role={"Smelter Heater"}/></Col>
                  
              </Row>
              <Row>
                  <Col><Part part={equipment.magnetCore} symbol={"magnetCraneIcon.png"} slot={"magnetCore" } role={"Magnet Core"}/></Col>
                  <Col></Col>
                 
                  <Col></Col>
                  <Col><Part part={fabrication.smelterControl} symbol={"smelteryIcon.png"} slot={"smelterControl" } role={"Smelter Controller"}/></Col>
              </Row>
              <Row>
                  <Col></Col>
                  <Col></Col>
                 
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row>
                  <Col><Part part={equipment.scoopSensor} symbol={"scoopIcon.png"} slot={"scoopSensor" } role={"Scoop Sensor"}/></Col>
                  <Col></Col>
                
                  <Col></Col>
                  <Col><Part part={equipment.clawScanner} symbol={"clawIcon.png"} slot={"clawScanner" } role={"Claw Scanner"}/></Col>
              </Row>
              <Row>
                  <Col><Part part={equipment.scoopMotor} symbol={"scoopIcon.png"} slot={"scoopMotor" } role={"Scoop Motor"}/></Col>
                  <Col></Col>
                
                  <Col></Col>
                  <Col><Part part={equipment.clawHydrolics} symbol={"clawIcon.png"} slot={"clawHydrolics" } role={"Claw Hydrolics"}/></Col>
              </Row>
              
          </Container>
          
    </div>
  )
}

export default GameScreen