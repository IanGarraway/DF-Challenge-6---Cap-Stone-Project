import GameData from "../models/gamedata.model.js";
import Generate from "../utils/Generate.util.js";

import newPlayerData from "../data/NewPlayerGameData.json" assert { type: "json" };
import Swap from "../utils/Swap.util.js";
import Find from "../utils/Find.util.js";
import Recalc from "../utils/Recalc.util.js";
import Calc from "../utils/Calc.util.js";

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
                
        try {
            let gameData = await GameData.findOne({ userID: req.userId });

            if (!gameData) { throw new Error("Invalid account data"); } 
            
            const newParts = Generate.parts(gameData);
            if (newParts[0] ) {                
                gameData.partsStorage = newParts[1];
                gameData.lastGen = Date.now();
            }
            const newResources = Generate.resources(gameData);
                        
            gameData.inventory = newResources;
            gameData.lastResourceGen = Date.now();
            

            await gameData.save();

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
            console.log(gameData, `gd - change`);
            
            const partIndex = Find.index(gameData.partsStorage, req.body.part); 
            console.log(partIndex, `<-change- `, gameData.partsStorage,` + `, req.body.part);

            if (partIndex === -1) { return 422; }
            
            gameData = Swap.part(gameData, partIndex);            
            gameData = Recalc.stats(gameData);           

            await gameData.save();   
            
            return 200;

        } catch (e) {            
            throw new Error(e.message)
        }
    }

    scrapPart = async(req) => {
        try {
            let gameData = await GameData.findOne({ userID: req.userId });
           
            
            if (!gameData) { throw new Error("Invalid account data"); } 

            const partIndex = Find.index(gameData.partsStorage, req.body.part); 
           

            if (partIndex === -1) { return 422; }

            const scrapValue = Calc.scrappage(gameData.partsStorage[partIndex]);
            
            gameData.inventory.t1Metal += scrapValue;
            if (scrapValue > 15) { gameData.inventory.t2Metal += scrapValue / 10; }
            
            gameData.partsStorage.splice(partIndex, 1);

            await gameData.save();

            return 200;
            
        }catch (e) {
            console.log(e, `<--error`);
            throw new Error(e.message)
        }
        
    }
    
}