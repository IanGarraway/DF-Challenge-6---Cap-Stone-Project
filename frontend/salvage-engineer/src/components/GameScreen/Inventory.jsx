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
        <div >
            <Stack direction='horizontal' gap={3} className='invItems' fluid>
                {partBoxes}
            </Stack>
            <div className='detailedInv'>
                <Stack direction='horizontal'>
                    <div>
                        selected
                        <DetailedPart part={inv[selected]} />
                    </div>
                    <div>
                        equipped
                        <DetailedPart part={equipped} />
                    </div>

                </Stack>

            </div>
          
        </div>
    );
}

export default Inventory