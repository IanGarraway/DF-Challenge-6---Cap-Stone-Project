


export default class Recalc {

    static stats(gameData) {
        let { stats, fabrication, equipment } = gameData;

        
        stats.grindSpd = this.#grinderSpd(fabrication);
        stats.grindStr = this.#grindStr(fabrication);
        stats.grindVol = this.#grindVol(fabrication);
        stats.smeltSpd = this.#smeltSpd(fabrication);
        stats.smeltTier = this.#smeltTier(fabrication);
        stats.findTime = this.#findTime(equipment);
        stats.speed = this.#speed(equipment)
        stats.maxQual = this.#maxQual(equipment);
        stats.gathVol = this.#gathVol(equipment);        
        stats.gathSpd = this.#gathSpd(equipment);

        return gameData;

    }

    static #grinderSpd(fabrication) {
        if (fabrication.grinderMotor.grindSpeed < fabrication.grinderGear.grindSpeed) {
            return fabrication.grinderMotor.grindSpeed;
        } else {
            return fabrication.grinderGear.grindSpeed;
        }
    
    }
    
    static #grindStr(fabrication) {
        return fabrication.grinderMotor.grindStr;        
    }

    static #grindVol(fabrication) {
        fabrication.grinderGear.grindVol;
    }
    static #smeltSpd(fabrication) {
            if (fabrication.smelterHeater.smeltSpd < fabrication.smelterControl.smeltSpd) {
            return fabrication.smelterHeater.smeltSpd;
        } else {
            return fabrication.smelterControl.smeltSpd;
        }
        }
    static #smeltTier(fabrication) {
           if (fabrication.smelterHeater.smeltTier < fabrication.smelterControl.smeltTier) {
            return fabrication.smelterHeater.smeltTier;
        } else {
            return fabrication.smelterControl.smeltTier;
        } 
        }
    static #findTime(equipment) {
        return equipment.sensor.findTime;
            
        }
    static #speed(equipment) {
        return equipment.scoopMotor.speed;
            
        }
    static #maxQual(equipment) {
        return equipment.clawScanner.maxQual + equipment.sensor.maxQual;
            
        }
    static #gathVol(equipment) {        

        return equipment.magnetMotor.gathVol + equipment.magnetCore.gathVol + equipment.clawHydrolics.gathVol + equipment.scoopMotor.gathVol + equipment.scoopSensor.gathVol;               
            
        }
    static #gathSpd(equipment) {

        return equipment.clawHydrolics.gathSpd + equipment.magnetMotor.gathSpd; 
            
        }
    

    
};
