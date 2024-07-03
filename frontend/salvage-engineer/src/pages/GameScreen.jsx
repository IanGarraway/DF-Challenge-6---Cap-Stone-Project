import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Modal, Alert } from 'react-bootstrap';

import Part from '../components/GameScreen/Part.jsx';
import GameService from '../service/Game.Service.js';
import Inventory from '../components/GameScreen/Inventory.jsx';
import StatsScreen from '../components/GameScreen/StatsScreen.jsx';
import PowerManagement from '../components/GameScreen/PowerManagement.jsx';


const GameScreen = ({setBackGroundImg}) => {

    useEffect(() => {
        setBackGroundImg(`url("backgrounds/background3.png`)
    }, []);

    

    // var r = document.querySelector('.salvageEngineer')
    // r.style.setProperty('background-image','url("backgrounds/background3.png")' )      

    const [gameData, setGameData] = useState();
    const [showInv, setShowInv] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showPower, setShowPower] = useState(false);
    const [itemFocus, setItemFocus] = useState("none");

    const handleInvClose = () => setShowInv(false);
    const handleInvShow = (focus) => {
        if(itemFocus!= focus) {setItemFocus(focus);}
        setShowInv(true);
    }
    const handleStatsClose = () => setShowStats(false);
    const handleStatsShow = () => setShowStats(true);

    const handlePowerClose = () => setShowPower(false);
    const handlePowerShow = () => setShowPower(true);

    

    const getData = async (trys = 0) => {
        let response;
        try {
            response = await GameService.getData();
            if (response.status === 200) {
                setGameData(response.data);

                await new Promise(resolve => setTimeout(resolve, 5000));
                getData();
            }
            if (response === 500) {
                if (trys < 10) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    getData(trys++);
                }
                else {
                    //add alert
                }
                
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
      <div className='gameScreen' style={{backgroundImage: `url("rig/salvageRig.jpg`}}>
          <Container fluid>
              <Row>
                  <Col onClick={()=>handleInvShow("magnetMotor")} style={{cursor: "pointer"}} data-testid={"magnetMotorIcon"}><Part part={equipment.magnetMotor} symbol={"magnetCraneIcon.png"} slot={"magnetMotor"} role={"Magnet Motor"}   /></Col>                  
                  <Col onClick={()=>handleInvShow("grinderMotor")} style={{cursor: "pointer"}} data-testid={"grinderMotorIcon"}><Part part={fabrication.grinderMotor} symbol={"grinderIcon.png"} slot={"grinderMotor"} role={"Grinder Motor"} /></Col>
                  <Col></Col>
                  <Col onClick={()=>handleInvShow("grinderGear")} style={{cursor: "pointer"}}><Part part={fabrication.grinderGear} symbol={"grinderIcon.png"} slot={"grinderGear" } role={"Grinder Gears"}/></Col>
                  <Col onClick={()=>handleInvShow("smelterHeater")} style={{cursor: "pointer"}}><Part part={fabrication.smelterHeater} symbol={"smelteryIcon.png"} slot={"smelterHeater" } role={"Smelter Heater"}/></Col>
                  
              </Row>
              <Row>
                  <Col onClick={()=>handleInvShow("magnetCore")} style={{cursor: "pointer"}} data-testid={"magnetCoreIcon"}><Part part={equipment.magnetCore} symbol={"magnetCraneIcon.png"} slot={"magnetCore" } role={"Magnet Core"} /></Col>
                  <Col></Col>
                 <Col></Col>
                  <Col></Col>
                  <Col onClick={()=>handleInvShow("smelterControl")} style={{cursor: "pointer"}}><Part part={fabrication.smelterControl} symbol={"smelteryIcon.png"} slot={"smelterControl" } role={"Smelter Controller"}/></Col>
              </Row>
              <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row>
                  <Col onClick={()=>handleInvShow("scoopSensor")} style={{cursor: "pointer"}}><Part part={equipment.scoopSensor} symbol={"scoopIcon.png"} slot={"scoopSensor" } role={"Scoop Sensor"}/></Col>
                  <Col></Col>
                <Col></Col>
                  <Col></Col>
                  <Col onClick={()=>handleInvShow("clawScanner")} style={{cursor: "pointer"}}><Part part={equipment.clawScanner} symbol={"clawIcon.png"} slot={"clawScanner" } role={"Claw Scanner"}/></Col>
              </Row>
              <Row>
                  <Col onClick={()=>handleInvShow("scoopMotor")} style={{cursor: "pointer"}}><Part part={equipment.scoopMotor} symbol={"scoopIcon.png"} slot={"scoopMotor" } role={"Scoop Motor"}/></Col>
                  <Col></Col>
                  <Col onClick={()=>handleInvShow("sensor")} style={{cursor: "pointer"}}><Part part={equipment.sensor} symbol={"sensorIcon.png"} slot={"sensor"} role={"Sensor"} /></Col>
                
                  <Col></Col>
                  <Col onClick={()=>handleInvShow("clawHydrolics")}><Part part={equipment.clawHydrolics} symbol={"clawIcon.png"} slot={"clawHydrolics" } role={"Claw Hydrolics"}/></Col>
              </Row>

              <Button variant="dark" onClick={()=>handleInvShow("none")} data-testid={"invButton"}>
                  Inventory
              </Button>
              <Button variant="dark" onClick={handleStatsShow} data-testid={"statsButton"}>
                  Stats
              </Button>
              <Button variant="dark" onClick={handlePowerShow} data-testid={"powerButton"}>
                  Power Management
              </Button>

              <Modal show={showInv} onHide={handleInvClose} size='xl'  >
                  <Modal.Header data-testid={"invClose"} closeButton style={{backgroundImage: 'url("backgrounds/rustymetal.avif")'}}>
                      <Modal.Title >Parts Storage</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{backgroundImage: 'url("backgrounds/rustymetal.avif")'}}>
                      <Inventory gameData={gameData} focus={itemFocus} getData={getData } />
                  </Modal.Body>
              </Modal>
              <Modal
                  show={showStats}
                  data-testid={"statsClose"}
                  onHide={handleStatsClose}
                  style={{
                      backgroundImage: 'url("backgrounds/rustyScreen.png")',
                      backgroundSize: "80%",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      alignContent: 'center',
                      justifyItems: 'start',
                  }}
              data-backdrop="false">
                  <StatsScreen stats={gameData.stats} equipment={gameData.equipment} upgrades={gameData.upgrades}
                      style={{
                          overflow: 'hidden',
                          offset: 'relative',
                          top: '10px'
                      }} />                  
              </Modal>
              <Modal show={showPower} onHide={handlePowerClose} style={{width: '100%'}}  >
                  <Modal.Header data-testid={"invClose"} closeButton style={{backgroundColor: 'grey'}}>
                      <Modal.Title >Power Management</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{
                      backgroundImage: 'url("backgrounds/powerbox.png")',
                      backgroundSize: "contain",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      

                  }}>
                      <PowerManagement power={gameData.power} caps={gameData.caps} />
                  </Modal.Body>
              </Modal>
          </Container>
          
    </div>
  )
}

export default GameScreen