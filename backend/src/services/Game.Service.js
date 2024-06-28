import GameData from "../models/gamedata.model.js";
import Generate from "../utils/Generate.util.js";

export default class GameService{

    getData = async (req) => {
        
        try {
            let gameData = await GameData.findOne({ userID: req.userId });
            console.log(gameData,`<-service`);
            gameData = Generate.parts(gameData);
            console.log(gameData,`<-service2`);

            await gameData.save();

            gameData._id = "";
            gameData.userID = "";
            return gameData;
            
        } catch (e) {
            console.log(e);
            
            throw new Error(e.message)
        }
        
    }

    newAccount = async (userId) => {
        try {
            const gameData = new GameData({
            userID: userId,
            lastGen: Date.now(),
            equipment: {
                "magnetMotor": {
                    "name": "Novatech Motor mk1",
                    "type": "magnetMotor",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "gathSpd": 1,
                    "gathVol": 1
                },
                "magnetCore": {
                    "name": "Novatech Magnet Core mk1",
                    "type": "magnetCore",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "maxQual": 1,
                    "gathVol": 1
                },
                "clawHydrolics": {
                    "name": "Novatech Hydrolics mk1",
                    "type": "clawHydrolics",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "gathSpd": 1,
                    "gathVol": 1
                },
                "clawScanner": {
                    "name": "Novatech Claw Scanner mk1",
                    "type": "clawScanner",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "maxQual": 2
                },
                "scoopMotor": {
                    "name": "Novatech Drive mk1",
                    "type": "scoopMotor",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "gathVol": 2,
                    "speed": 1
                },
                "scoopSensor": {
                    "name": "Novatech ConveyorScan mk1",
                    "type": "scoopSensor",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "maxQual": 1
                },
                "sensor": {
                    "name": "Novatech Salvage Scan mk1",
                    "type": "sensor",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "findTime": 1,
                    "maxQual": 1
                }
            },
            "fabrication": {
                "grinderMotor": {
                    "name": "Novatech ShredTech Motor",
                    "type": "grinderMotor",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "grindSpeed": 1,
                    "grindStr": 1
                },
                "grinderGear": {
                    "name": "Novatech ShredTech GrindGear",
                    "type": "grinderGear",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "grindSpeed": 1,
                    "grindVol": 1
                },
                "smelterHeater": {
                    "name": "Novatech SmeltTech Heater",
                    "type": "smelterHeater",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "smeltSpd": 1,
                    "smeltTier": 1
                },
                "smelterControl": {
                    "name": "Novatech SmeltTech Controller",
                    "type": "smelterControl",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "smeltSpd": 1,
                    "smeltTier": 1
                }
            }

            });
            
            await gameData.save();
            return;
        } catch (e) {
            throw new Error(e.message)
        }
        
    }
    
}