


export default class Recalc {

    static stats(gameData) {
        let { stats, fabrication, equipment, power } = gameData;
        
        stats.grinderSpd = this.#grinderSpd(fabrication, power.fabricator);
        stats.grinderStr = this.#grindStr(fabrication, power.fabricator);
        stats.grinderVol = this.#grindVol(fabrication, power.fabricator);
        stats.smeltSpd = this.#smeltSpd(fabrication, power.fabricator);
        stats.smeltTier = this.#smeltTier(fabrication, power.fabricator);
        stats.findTime = this.#findTime(equipment);
        stats.speed = this.#speed(equipment, power)
        stats.maxQual = this.#maxQual(equipment, power);
        stats.gathVol = this.#gathVol(equipment, power);        
        stats.gathSpd = this.#gathSpd(equipment, power);

        return gameData;

    }

    static #grinderSpd(fabrication, isItOn) {        
        if (!isItOn) return 0;
        if (fabrication.grinderMotor.grindSpeed < fabrication.grinderGear.grindSpeed) {
            return fabrication.grinderMotor.grindSpeed;
        } else {
            return fabrication.grinderGear.grindSpeed;
        }    
    }
    
    static #grindStr(fabrication, isItOn) {
        if (!isItOn) return 0;
        return fabrication.grinderMotor.grindStr;        
    }

    static #grindVol(fabrication, isItOn) {
        if (!isItOn) return 0;
        fabrication.grinderGear.grindVol;
    }
    static #smeltSpd(fabrication, isItOn) {
        if (!isItOn) return 0;
        if (fabrication.smelterHeater.smeltSpd < fabrication.smelterControl.smeltSpd) {
            return fabrication.smelterHeater.smeltSpd;
        } else {
            return fabrication.smelterControl.smeltSpd;
        }
    }
    static #smeltTier(fabrication, isItOn) {
        if (!isItOn) return 0;
        if (fabrication.smelterHeater.smeltTier < fabrication.smelterControl.smeltTier) {
            return fabrication.smelterHeater.smeltTier;
        } else {
            return fabrication.smelterControl.smeltTier;
        }
    }
    static #findTime(equipment) {
        return equipment.sensor.findTime;
            
        }
    static #speed(equipment, power) {
        if (!power.scoop) return 0;
        return equipment.scoopMotor.speed;
            
        }
    static #maxQual(equipment, power) {
        let qualValue = equipment.sensor.maxQual;
        if (power.claw) qualValue += equipment.clawScanner.maxQual;
        return qualValue;
            
        }
    static #gathVol(equipment, power) {        
        let value = 0;
        if (power.magnet) { value += equipment.magnetMotor.gathVol + equipment.magnetCore.gathVol; }
        if (power.claw) { value += equipment.clawHydrolics.gathVol; }
        if (power.scoop) {value += equipment.scoopMotor.gathVol + equipment.scoopSensor.gathVol}
        return value
            
        }
    static #gathSpd(equipment, power) {
        let value = 0;
        if (power.magnet) { value += equipment.magnetMotor.gathSpd;  }
        if (power.claw) { value += equipment.clawHydrolics.gathSpd; }        
        return value       
            
        }
};
