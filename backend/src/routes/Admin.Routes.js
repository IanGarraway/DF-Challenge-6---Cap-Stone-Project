import { Router } from "express";
import { body } from "express-validator";
import AdminController from "../controllers/Admin.Controller.js";
import LoginValidator from "../middleware/Login.validator.js";


export default class AdminRoutes{
    #origin;
    #controller;
    #router;
    #routeStartPoint;

    constructor(origin = "http://localhost:5173", controller = new AdminController(), routeStartPoint = "/admin") {
        this.#origin = origin;
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

        //Admin Routes

        this.#router.get('/data', [
            LoginValidator.verifyToken,
            LoginValidator.isAdmin
        ], this.#controller.getData);

        this.#router.post('/promote', [
            body(`accountId`).exists().notEmpty().escape(),
            LoginValidator.verifyToken,
            LoginValidator.isAdmin            
        ], this.#controller.promote)

        this.#router.post('/delete', [
            body(`accountId`).exists().notEmpty().escape(),
            LoginValidator.verifyToken,
            LoginValidator.isAdmin            
        ], this.#controller.delete)
        
    };
    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}