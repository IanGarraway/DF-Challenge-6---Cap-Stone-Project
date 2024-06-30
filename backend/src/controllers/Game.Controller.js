import GameService from "../services/Game.Service.js";


export default class GameController{

    #gameService

    constructor(gameService = new GameService()) {
        this.#gameService = gameService;
    }

    getData = async (req, res) => {        
        try {            
            const gameData = await this.#gameService.getData(req);
                        
            return res.status(200).send(gameData);
        } catch (e) {
            
            return res.status(500).send({ message: e.message });
        }                
        
    }

    changePart = async (req, res) => {
        try {
            const response = await this.#gameService.changePart(req);            

            if(response === 422){ return res.status(422).send({ message: "invalid data" });}

            return res.status(200).send({ message: "part changed" });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    scrapPart = async (req, res) => {
        try {
            const response = await this.#gameService.scrapPart(req);            

            if(response === 422){ return res.status(422).send({ message: "invalid data" });}

            return res.status(200).send({ message: "part scrapped" });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
    
}