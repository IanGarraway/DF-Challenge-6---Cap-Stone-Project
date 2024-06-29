import { Router } from "express";
import GameController from "../controllers/Game.Controller.js";
import LoginValidator from "../middleware/Login.validator.js";


export default class GameRoutes{
    #origin;
    #controller;
    #router;
    #routeStartPoint;

    constructor(origin = "http://localhost:5173", controller = new GameController(), routeStartPoint = "/") {
        this.#origin=origin
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        
        // CORS middleware to set headers
        this.#router.use((req, res, next) => {
            
            res.header("Access-Control-Allow-Origin", this.#origin);
            res.header("Access-Control-Allow-Methods", "GET, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        //Game Routes

        this.#router.get('/data', [
            LoginValidator.verifyToken
        ], this.#controller.getData);
        
        this.#router.patch('/changepart', [
            LoginValidator.verifyToken
        ], this.#controller.changePart);
        
    };
    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}