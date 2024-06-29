import GameData from "../models/gamedata.model.js";
import Generate from "../utils/Generate.util.js";

import newPlayerData from "../data/NewPlayerGameData.json" assert { type: "json" };

export default class GameService{

    getData = async (req) => {
        let changed = false;
        
        try {
            let gameData = await GameData.findOne({ userID: req.userId });
            
            const newParts = Generate.parts(gameData);
            if (newParts != gameData.partsStorage) {
                changed = true;
                gameData.partsStorage = newParts;
                gameData.lastGen = Date.now();
            }
            

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
    
}