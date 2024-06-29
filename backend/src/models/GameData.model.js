import { Schema, model } from "mongoose";


const partSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    mlogo: { type: String, required: true },
    gathSpd: { type: Number },
    gathVol: { type: Number },
    maxQual: { type: Number },
    speed: { type: Number },
    findTime: { type: Number },
    grindSpeed: { type: Number },
    grindStr: { type: Number },
    grindVol: { type: Number },
    smeltSpd: { type: Number },
    smeltTier: { type: Number }
}, { _id: false });


const GameDataSchema = new Schema({
    userID: { type: String, required: true },    
    lastGen: { type: Date, required: true },
    lastResourceGen: {type: Date, required: true},
    inventory: {
        credits: { type: Number, default: 0 },
        scrap: { type: Number, default: 0 },
        t1Metal: { type: Number, default: 0 },
        t2Metal: { type: Number, default: 0 },
        t3Metal: { type: Number, default: 0 }
    },
    equipment: {
        magnetMotor: partSchema,
        magnetCore: partSchema,
        clawHydrolics: partSchema,
        clawScanner: partSchema,
        scoopMotor: partSchema,
        scoopSensor: partSchema,
        sensor: partSchema        
    },
    fabrication: {
        grinderMotor: partSchema,
        grinderGear: partSchema,
        smelterHeater: partSchema,
        smelterControl: partSchema,        
    },
    partsStorage: [partSchema],
    stats: {
        grinderSpd: { type: Number, default: 1 },
        grinderVol: { type: Number, default: 1 },
        grinderStr: { type: Number, default: 1 },
        smeltSpd: { type: Number, default: 1 },
        smeltTier: { type: Number, default: 1 },
        maxQual: { type: Number, default: 1 },
        gathSpd: { type: Number, default: 1 },
        gathVol: { type: Number, default: 1 },
        speed: { type: Number, default: 1 },
        zone: { type: Number, default: 1 }
    },
    upgrades: {
        reactor: { type: Number, default: 0 },
        powerDis: { type: Number, default: 0 },
        partsContainer: { type: Number, default: 0 },
        rawResourceHopper: { type: Number, default: 0 }
    },
    power: {
        fabricator: { type: Boolean, default: false },
        claw: { type: Boolean, default: false },
        magnet: { type: Boolean, default: false },
        scoop: { type: Boolean, default: false },
    },
    caps: {
        partsCap: { type: Number, default: 10 },
        scrapCap: { type: Number, default: 100 },
        maxPower: { type: Number, default: 1 },
        maxDist: { type: Number, default: 1 }
    }
});

const GameData = model("GameData", GameDataSchema);

export default GameData;