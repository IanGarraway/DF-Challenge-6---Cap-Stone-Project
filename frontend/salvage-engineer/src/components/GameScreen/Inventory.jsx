import React, { useEffect, useState } from 'react'
import InventoryFocus from '../../util/InventoryFocus.util';
import PartDetails from './PartDetails';
import { Row, Col, Stack, Button } from 'react-bootstrap';
import DetailedPart from './DetailedPart';
import GameService from '../../service/Game.Service';
import Storage from './Storage';

const placeHolderPart = {
    name: "empty",
    manufacturer: "empty",
    type: "clawHydrolics",
    mlogo: "placeholder.png"
};

function Inventory({ gameData, focus, getData }) {
    const [inv, setInv] = useState([placeHolderPart]);
    const [selected, setSelected] = useState(0);
    const [disableButtons, setDisableButtons] = useState(false)
    let equipped;        

    useEffect(() => {
        let invItems = [];        
        if (focus !== "none") {
            const items = InventoryFocus.onType(gameData.partsStorage, focus)
            invItems = items;
        } else {
            invItems = gameData.partsStorage;
        }

        if (invItems.length === 0) {
            setDisableButtons(true);
            invItems = [
                {
                    name: "empty",
                    manufacturer: "empty",
                    type: focus === "none" ? "clawHydrolics" : focus,
                    mlogo: "placeholder.png"
                }
            ];
            
        } else { setDisableButtons(false)}
        
        setInv(invItems);
    }, [gameData, focus]);  

    const partBoxes = inv.map((part, i) => {
        const isSelected = (selected === i);
        return (
            
            <Col key={i}>
                <div key={i} onClick={() => setSelected(i)}>
                <PartDetails key={i} part={part} isSelected={isSelected} />
                </div>
            </Col>
            
        );
    });
    const options = ["grinderMotor", "grinderGear", "smelterHeater", "smelterControl"]
    
    let invType = inv[selected].type || "clawHydrolics";
    if (options.includes(invType)) { equipped = gameData.fabrication[invType]; }
    else { equipped = gameData.equipment[invType] }
    
    const equipItemHandler = async() => {
        try {
            const response = await GameService.changePart(inv[selected]);

            if (response.status === 200) {
                getData();
            }
        } catch (e) {
            console.error(e);
        }
        
    }

    const scrapItemHandler = async() => {
        try {
            const response = await GameService.scrapPart(inv[selected]);

            if (response.status === 200) {
                getData();
            }
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className='parstsStorage' >
            <Stack direction='horizontal' gap={3} className='invItems' >
                {partBoxes}
                <div className="vr"></div>
            </Stack>
            <div className='detailedInv'>
                <Stack direction='horizontal' style={{justifyContent:'center', alignItems: 'center', padding: '10px'}}>
                    <div className='partsStorage' style={{padding: '10px', fontSize: '2vh'}}>
                        <div style={{fontsize: "5vh", fontstyle: "bold"}}>selected</div>
                        <DetailedPart part={inv[selected]} key={"selected"} />
                    </div>
                    <div className='partsEquipped' style={{padding: '10px', fontSize: '2vh', border: "black"}}>
                        equipped
                        <DetailedPart part={equipped} key={"equipped"} />
                    </div>
                    <div className='storage' style={{padding: '10px', fontSize: '2vh', border: "black"}}>
                         ``
                        <Storage inv={gameData.inventory} />
                    </div>
                </Stack>
            </div>
            <div className='invControlBox'>
            selected
            <div className='controls'>
                
                <Button variant='success' onClick={equipItemHandler} data-testid={"equipButton"} disabled={disableButtons}>Equip</Button>
                <Button variant='danger' onClick={scrapItemHandler} data-testid={"scrapButton"}disabled={disableButtons}>Scrap</Button>

                </div>
                </div>
            <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'row', justifyContent:'end'}}>
                background Image by <a href="https://www.freepik.com/free-photo/extremely-close-up-rusty-brown-iron-wall_10980213.htm#query=rusty%20metal&position=0&from_view=keyword&track=ais_user&uuid=4662a4ce-e30a-4395-88e1-5401e3b1b8c3">Freepik</a>
            </div>
        </div>
    );
}

export default Inventory