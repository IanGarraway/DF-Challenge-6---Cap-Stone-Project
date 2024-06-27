import NameGenerator from "./parts/NameGenerator.util.js";
import TypeGenerator from "./parts/TypeGenerator.util.js"


export default class Generate{

    static part = (maxQual, zone) => {

        let newPart = TypeGenerator.getType(maxQual, zone);
        newPart = NameGenerator.getName(newPart);

        return newPart;

        
    }

    static parts = (gameData) => {
        const { stats, lastGen } = gameData;
        

        const timeSince = Date.now() - lastGen;
        
        const timeBetween = (30 * stats.zone) - stats.gathSpd;
        let partsToGen = Math.floor((timeSince / 1000) / timeBetween);
        
        if (partsToGen == 0) { return gameData; }

        gameData = this.#generateParts(gameData, partsToGen);
        gameData.lastGen = Date.now();        

        return gameData;

        
    }

    static #generateParts = (gameData, partsToGen) => {
        
        let { stats, caps, partsStorage } = gameData;        
        const capacity = caps.partsCap - partsStorage.length;        
        if (partsToGen > capacity) { partsToGen = capacity; }
        
        for (let i = 0; i < partsToGen; i++) {            
            partsStorage.push(this.part(stats.maxQual, stats.zone));            
        }
        
        return gameData;
            
    };

        
 
    
}