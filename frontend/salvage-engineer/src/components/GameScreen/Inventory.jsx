import React, { useEffect, useState } from 'react'
import InventoryFocus from '../../util/InventoryFocus.util';
import PartDetails from './PartDetails';
import { Row, Col, Stack } from 'react-bootstrap';
import DetailedPart from './DetailedPart';

function Inventory({ gameData, focus }) {
    const [inv, setInv] = useState(gameData.partsStorage);
    const [selected, setSelected] = useState(0);
    let equipped;
    

    useEffect(() => {
        if (focus !== "none") {
            const items = InventoryFocus.onType(gameData.partsStorage, focus)            
            setInv(items)
        }
    }, []);  

    const partBoxes = inv.map((part, i) => {
        const isSelected = (selected === i);
        return (
            
            <Col>
                <div key={i} onClick={() => setSelected(i)}>
                <PartDetails part={part} isSelected={isSelected} />
                </div>
            </Col>
            
        );
    });
    const options =["grinderMotor", "grinderGear", "smelterHeater", "smelterControl" ]
    if (options.includes(inv[selected].type)) { equipped = gameData.fabrication[inv[selected].type]; }
    else{equipped = gameData.equipment[inv[selected].type]}


    return (
        <div className='parstsStorage' >
            <Stack direction='horizontal' gap={3} className='invItems' fluid>
                {partBoxes}
            </Stack>
            <div className='detailedInv'>
                <Stack direction='horizontal' fluid style={{justifyContent:'center', alignItems: 'center', padding: '10px'}}>
                    <div style={{padding: '10px', fontSize: '1.5vh'}}>
                        selected
                        <DetailedPart part={inv[selected]} />
                    </div>
                    <div style={{padding: '10px', fontSize: '1.5vh'}}>
                        equipped
                        <DetailedPart part={equipped} />
                    </div>

                </Stack>

            </div>
            <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'row', justifyContent:'end'}}>
                Image by <a href="https://www.freepik.com/free-photo/extremely-close-up-rusty-brown-iron-wall_10980213.htm#query=rusty%20metal&position=0&from_view=keyword&track=ais_user&uuid=4662a4ce-e30a-4395-88e1-5401e3b1b8c3">Freepik</a>
            </div>
        </div>
    );
}

export default Inventory