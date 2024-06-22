import GameService from "../services/Game.Service.js";


export default class GameController{

    #gameService

    constructor(gameService = new GameService()) {
        this.#gameService = gameService;
    }

    getData = () => {
        console.log("Game Controller getData");
    }
    
}