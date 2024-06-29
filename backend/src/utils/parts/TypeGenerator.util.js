import GetRandom from "../GetRandom.util.js";


export default class TypeGenerator{

    static getType = (maxQual, zone) => {
        
        let part = {};

        const partGen = GetRandom.int(11);

        switch (partGen) {
            case 0: 
                part = this.#magnetMotor(part, maxQual, zone);
                break;            
            case 1:
                part = this.#magnetCore(part, maxQual, zone);
                break;
            case 2:
                part = this.#clawHydrolics(part, maxQual, zone);
                break;
            case 3:
                part = this.#clawScanner(part, maxQual, zone);
                break;
            case 4:
                part = this.#scoopMotor(part, maxQual, zone);
                break;
            case 5:
                part = this.#scoopSensor(part, maxQual, zone);
                break;
            case 6:
                part =this.#sensor(part, maxQual, zone);
                break;
            case 7:
                part = this.#grinderMotor(part, maxQual, zone);
                break;
            case 8:
                part =this.#grindGear(part, maxQual, zone);
                break;
            case 9:
                part = this.#smelterHeater(part, maxQual, zone);
                break;
            case 10:
                part=this.#smelterControl(part, maxQual, zone);
                break;
                
        }
        
        return part;
        
    }

    static #magnetMotor = (part, maxQual, zone) => {
        part.type = "magnetMotor";
        part.gathSpd = GetRandom.int(1 + maxQual + zone)
        part.gathVol = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    
    static #magnetCore = (part, maxQual, zone) => {
        part.type = "magnetCore";
        part.gathVol = GetRandom.int(1 + maxQual + zone) + GetRandom.int(1 + maxQual + zone);
        return part;
    };
    static #clawHydrolics = (part, maxQual, zone) => {
        part.type = "clawHydrolics";
        part.gathSpd = GetRandom.int(1 + maxQual + zone)
        part.gathVol = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    static #clawScanner = (part, maxQual, zone) => {
        part.type = "clawScanner";
        part.maxQual = GetRandom.int(1 + maxQual + zone) + GetRandom.int(1 + maxQual + zone);
        return part;
    }
    static #scoopMotor = (part, maxQual, zone) => {
        part.type = "scoopMotor";
        part.speed = GetRandom.int(1 + maxQual + zone)
        part.gathVol = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    static #scoopSensor = (part, maxQual, zone) => {
        part.type = "scoopSensor";
        part.gathSpd = GetRandom.int(1 + maxQual + zone)
        part.gathVol = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    static #sensor = (part, maxQual, zone) => {
        part.type = "sensor";
        part.maxQual = GetRandom.int(1 + maxQual + zone);
        part.findTime = GetRandom.int(1 + maxQual + zone);
        return part;
    }
    static #grinderMotor = (part, maxQual, zone) => {
        part.type = "grinderMotor";
        part.grindSpeed = GetRandom.int(1 + maxQual + zone)
        part.grindStr = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    static #grindGear = (part, maxQual, zone) => {
        part.type = "grindGear";
        part.grindSpeed = GetRandom.int(1 + maxQual + zone)
        part.grindVol = GetRandom.int(1 + maxQual + zone)
        return part;
    }
    static #smelterHeater = (part, maxQual, zone) => {
        part.type = "smelterHeater";
        part.smeltSpd = GetRandom.int(1 + maxQual + zone)
        part.smeltTier = GetRandom.int(1 + zone)
        return part;
    }
    static #smelterControl = (part, maxQual, zone) => {
        part.type = "smelterControl";
        part.smeltSpd = GetRandom.int(1 + maxQual + zone)
        part.smeltTier = GetRandom.int(1 + zone)
        return part;
    }
    
}