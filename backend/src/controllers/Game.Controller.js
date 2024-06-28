import GameService from "../services/Game.Service.js";


export default class GameController{

    #gameService

    constructor(gameService = new GameService()) {
        this.#gameService = gameService;
    }

    getData = async (req, res) => {        
        try {            
            const gameData = await this.#gameService.getData(req);
            console.log(gameData, `<-controller`);
            
            return res.status(200).send(gameData);
        } catch (e) {
            
            return res.status(500).send({ message: e.message });
        }                
        
    }
    
}