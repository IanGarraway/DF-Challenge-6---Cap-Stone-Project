import React, { useState, Image, useEffect } from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap';
import CalculatePower from '../../util/calculatePower.util';
import AllPowerOff from '../../util/AllPowerOff.util';
import GameService from '../../service/Game.Service';

function PowerManagement({power, caps}) {
    const [powerBox, setPowerBox] = useState(power);

    let fabricatorLight = powerBox.fabricator ? "parts/GreenLightIcon.png" : "parts/RedLightIcon.png";
    let clawLight = powerBox.claw ? "parts/GreenLightIcon.png" : "parts/RedLightIcon.png";
    let magnetLight = powerBox.magnet ? "parts/GreenLightIcon.png" : "parts/RedLightIcon.png";
    let scoopLight = powerBox.scoop ? "parts/GreenLightIcon.png" : "parts/RedLightIcon.png";
    let brokenLight = "parts/BrokenLightIcon.png"

    useEffect(() => {        
        setPowerBox(power)
    }, [power, caps])
    
    
    
    const patchPower = async (newPowerBox) => {
        try {           
            const response = await GameService.changePower(newPowerBox);   
            if (response.status != 200) {
                throw Error("failed to patch power");
            }
            
        } catch (e) {
            console.error(e);
        }

    }
    
    const handleSelectButton = (button) => {
        let newPowerBox = { ...powerBox, [button]: !powerBox[button] };   
               
        const totalPowerUsage = CalculatePower(newPowerBox);
        
        if (totalPowerUsage > (Math.min(caps.maxPower, caps.maxDist))) {
            newPowerBox = AllPowerOff(newPowerBox) 
            flashLights();            
        }       
        
        patchPower(newPowerBox);
        setPowerBox(newPowerBox);
    }

    const flashLights = async () => {
        brokenLight = "parts/WhiteLightIcon.png";
        await new Promise(resolve => setTimeout(resolve, 50));
        brokenLight = "parts/BrokenLightIcon.png"        
        await new Promise(resolve => setTimeout(resolve, 50));
        brokenLight = "parts/WhiteLightIcon.png";
        await new Promise(resolve => setTimeout(resolve, 50));
        brokenLight = "parts/BrokenLightIcon.png"

    }

    return (
        <Container style={{alignItems: 'center'}}>
            <Row>
                <Col className='labelText' style={{width: '30%'}}>
                    Claw Crane
                    
                </Col>
                <Col style={{display: 'flex', justifyContent: 'end'}}>
                    <img src={clawLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} onClick={()=>handleSelectButton("claw")}/>
                </Col>
                <Col>
                    <img src={brokenLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} />
                </Col>
                <Col className='labelText' style={{width: '30%'}} >
                    Spare
                    
                </Col>
                
            </Row>
            <Row>
                <Col className='labelText'>
                    <div>
                        <p>Magnet Crane System</p>
                    </div>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'end'}}>
                    <img src={magnetLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} onClick={()=>handleSelectButton("magnet")} />
                </Col>
                <Col>
                    <img src={brokenLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} />
                </Col>
                <Col className='labelText'>
                    Spare
                    
                </Col>
            </Row>
            <Row>
                <Col className='labelText'>
                    Scoop System
                </Col>
                <Col style={{display: 'flex', justifyContent: 'end'}}>
                    <img src={scoopLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} onClick={()=>handleSelectButton("scoop")}/>
                </Col>
                <Col>
                    <img src={brokenLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} />
                </Col>
                <Col className='labelText'>
                    Spare
                    
                </Col>
            </Row>
            <Row>
                <Col className='labelText' style={{width: '30%', fontSize: '1.2vh'}} >
                    Fabrication System
                </Col>
                <Col style={{display: 'flex', justifyContent: 'end', alignContent: 'center'}}>
                    <img src={fabricatorLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} onClick={()=>handleSelectButton("fabricator")}/>
                </Col>
                <Col>
                    <img src={brokenLight} style={{ width: '8vh', height: '8vh', padding: '1vh' }} />
                </Col>
                <Col className='labelText'>
                    Spare
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default PowerManagement