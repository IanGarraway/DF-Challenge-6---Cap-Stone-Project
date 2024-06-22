import { Router } from "express";
import { body, validationResult } from "express-validator";
import AccountController from "../controllers/Account.Controller.js";

import VerifySignup from "../middleware/VerifySignup.js";


export default class AccountRoutes{
    #origin;
    #controller;
    #router;
    #routeStartPoint;

    constructor(origin = "http://localhost:5173", controller = new AccountController(), routeStartPoint = "/auth") {
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

        //Auth Routes
        this.#router.post('/newuser', [
            body(`email`).exists().normalizeEmail().notEmpty().escape().isEmail(),
            body(`username`).exists().notEmpty().escape(),
            body('password').exists().notEmpty().escape(),
            body('name').exists().notEmpty().escape(),
            VerifySignup.userUnique
        ], this.#controller.newUser);

        this.#router.post('/login', [
            body(`username`).exists().notEmpty().escape(),
            body('password').exists().notEmpty().escape(),
        ], this.#controller.login);
        
    };
    getRouter = () => { return this.#router; };
    getRouteStartPoint = () => { return this.#routeStartPoint; };
}