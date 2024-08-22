import bcrypt from "bcrypt";

import AccountService from "../services/Account.Service.js";
import User from "../models/User.model.js";
import { validationResult } from "express-validator";
import GameService from "../services/Game.Service.js";

const { SECURE } = process.env;


export default class AccountController{
    #accountService;
    #gameService;

    constructor(accountService = new AccountService, gameService = new GameService) {
        this.#accountService = accountService;
        this.#gameService = gameService;
    }



    newUser = async (req, res) => {             
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
            }
            const user = new User({
                userName: req.body.username.toLowerCase(),
                userPassword: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email.toLowerCase(),
                name: req.body.name,
                admin: false
            });

            await user.save();
            await this.#gameService.newAccount(user._id);
            return res.status(201).send({ message: "User was registered successfully" });
        } catch (error) {
            console.log("Registration error -->", error);

            return res.status(500).send({ message: error.message || "Some error occurred while attempting to register" });
        }
    }

    login = async (req, res) => { 
        try {
            
            let user = await this.#accountService.login(req.body);           
            
            return res.status(200)
                .cookie('token', user.Token, {
                    httpOnly: true,
                    secure: SECURE, //needs to be true if on https
                    sameSite: 'Strict',
                    maxAge: 86400000 //24 hours in milliseconds 
                })
                .send({ message: "User has logged in", username: user.userName, ...(user.admin&&{admin: true}) });
            
        } catch (error) {
            //console.log(error);
            res.status(401).json(error);
        }        
    }

    changePassword = async (req, res) => {
        
        try {
            let user = await this.#accountService.changePassword(req);
            return res.status(200).send({ message: "Password changed" });
        } catch (error) {
            //console.log(`Error in password change ->`, error);
            res.status(401).json(error);
        }
    }

    deleteAccount = async (req, res) => {
        try {
            let user = await this.#accountService.deleteAccount(req);
            return res.status(200)
                .cookie('token', "", {
                    httpOnly: true,
                    secure: SECURE, //needs to be true if on https
                    sameSite: 'Strict',
                    maxAge: 0 //revokes existing token cookie
                })
                .send({ message: "Account deleted" });
        } catch (error) {
            res.status(401).send({message: "Unauthorised"}).json(error);
        }
    }

    logout = async (req, res) => {        
        try {
            
            return res.status(200)
                .cookie('token', "logout", {
                    httpOnly: true,
                    secure: SECURE, //needs to be true if on https
                    sameSite: 'None',
                    maxAge: 0 
                })
                .send({ message: "User has logged out" });
            
        } catch (error) {
            //console.log(error);
            res.status(401).json(error);
        }        
    }
    
}