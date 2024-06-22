import bcrypt from "bcrypt";

import AccountService from "../services/Account.Service.js";
import User from "../models/User.model.js";
import { validationResult } from "express-validator";


export default class AccountController{
    #accountService;

    constructor(accountService = new AccountService) {
        this.#accountService = accountService;
    }



    newUser = async (req, res) => {        
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
            }
            const user = new User({
                userName: req.body.username,
                userPassword: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                name: req.body.name,
                admin: false
            });

            await user.save();
            return res.status(201).send({ message: "User was registered successfully" });
        } catch (error) {
            console.log("Registration error -->", error);

            return res.status(500).send({ message: error.message || "Some error occurred while attempting to register" });
        }
    }
    
}