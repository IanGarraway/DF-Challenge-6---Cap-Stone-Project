import GameData from "../models/gamedata.model.js";
import Generate from "../utils/Generate.util.js";

import newPlayerData from "../data/NewPlayerGameData.json" assert { type: "json" };
import Swap from "../utils/Swap.util.js";
import Find from "../utils/Find.util.js";
import Recalc from "../utils/Recalc.util.js";

export default class GameService{

    newAccount = async (userId) => {
        try {
            let newPlayer = newPlayerData;
            newPlayer.userID = userId;
            newPlayer.lastGen = Date.now();
            newPlayer.lastResourceGen = Date.now();
            
            const gameData = new GameData(newPlayer);
            
            await gameData.save();
            return;
        } catch (e) {
            throw new Error(e.message)
        }
        
    }

    getData = async (req) => {
        let changed = false;
        
        try {
            let gameData = await GameData.findOne({ userID: req.userId });

            if (!gameData) { throw new Error("Invalid account data"); } 
            
            const newParts = Generate.parts(gameData);
            if (newParts != gameData.partsStorage) {
                changed = true;
                gameData.partsStorage = newParts;
                gameData.lastGen = Date.now();
            }
            const newResources = Generate.resources(gameData);
            
            if (newResources != gameData.inventory) {
                changed = true;
                gameData.inventory = newResources;
                gameData.lastResourceGen = Date.now();
            }

            changed && await gameData.save();

            gameData._id = "";
            gameData.userID = "";
            return gameData;
            
        } catch (e) {    
            // console.log(e,`service error`);
            throw new Error(e.message)
        }
        
    }

    

    changePart = async (req) => {
        try {           
            let gameData = await GameData.findOne({ userID: req.userId });
            
            if (!gameData) { throw new Error("Invalid account data"); }   
            
            //console.log(gameData.partsStorage,`<->`, req.body);

            const partIndex = Find.index(gameData.partsStorage, req.body.part);            

            if (partIndex === -1) { return 422; }
            
            gameData = Swap.part(gameData, partIndex);            
            gameData = Recalc.stats(gameData);           

            await gameData.save();   
            
            return 200;

        } catch (e) {
            console.log(e, `<--error`);
            throw new Error(e.message)
        }
    }
    
}