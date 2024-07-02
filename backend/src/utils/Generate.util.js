import NameGenerator from "./parts/NameGenerator.util.js";
import TimeTicks from "./TimeTicks.util.js";
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
        
        const timeBetween = (30 * stats.zone) - (1*(stats.gathSpd/3000));
        
        let partsToGen = Math.floor((timeSince / 1000) / timeBetween);
        
        
        
        if (partsToGen <= 0) { return [false, gameData.partsStorage]; }

        const parts = this.#generateParts(gameData, partsToGen);
        
        

        return [true, parts];

        
    }

    static #generateParts = (gameData, partsToGen) => {
        
        let { stats, caps, partsStorage } = gameData;        
        const capacity = caps.partsCap - partsStorage.length;        
        if (partsToGen > capacity) { partsToGen = capacity; }
        
        for (let i = 0; i < partsToGen; i++) {            
            partsStorage.push(this.part(stats.maxQual, stats.zone));            
        }
        
        return partsStorage;
            
    };

    static resources = (gameData) => {
        let { stats, inventory, caps, lastResourceGen, upgrades } = gameData;        
        
        const timeBetween = (Date.now() - lastResourceGen) / 1000;

        const gatherTimeTicks = TimeTicks.calc(30, stats.gathSpd);
        const grindTimeTicks = TimeTicks.calc(30, stats.grinderSpd);
        const smeltTimeTicks = TimeTicks.calc(30*upgrades.smelter, stats.smeltSpd);

        const gatherTicks = timeBetween / gatherTimeTicks;
        const grindTicks = timeBetween / grindTimeTicks;
        const smeltTicks = timeBetween / smeltTimeTicks;
        if (gatherTicks == 0 && grindTicks == 0 && smeltTicks == 0) { return [false,inventory]; }
        
        const totalGathered = (gatherTicks*stats.gathVol)+inventory.scrap;
        const totalGround = Math.min(totalGathered, (grindTicks*stats.grinderVol)+inventory.ground);
        const totalSmelt = Math.min(totalGround, (upgrades.smelter * 10) * smeltTicks);        
        

        const scrapLeft = Math.min(caps.scrapCap, totalGathered - totalGround);        
        const groundLeft = Math.min(caps.scrapCap, totalGround - totalSmelt);        

        inventory.scrap = scrapLeft;
        inventory.ground = groundLeft;        
        inventory.t1Metal += totalSmelt / 10;



        return [true, inventory];



        
    }

        
 
    
}