

export default class Swap{
    
    static part(gameData, partIndex) {
        
        const slot = gameData.partsStorage[partIndex].type; 
        
        let temp;
        const options = ["grinderMotor", "grinderGear", "smelterHeater", "smelterControl"];
        if (options.includes(slot)) {
            temp = gameData.fabrication[slot]; 
            gameData.fabrication[slot] = gameData.partsStorage[partIndex];           
        }
        else {
            temp = gameData.equipment[slot];
            gameData.equipment[slot] = gameData.partsStorage[partIndex]; 
        };
        if (temp == null) {
            temp = {
                name: "Scrap",
                type: slot,
                manufacturer: "unknown",
                mlogo: "placeholder.png"
            }
        }
        gameData.partsStorage[partIndex] = temp;
                
        return gameData;
    };
}


    


