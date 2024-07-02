import User from "../models/User.model.js";

export default class VerifySignup{

    static userUnique = async (req, res, next) => {        
        try {            
            const usernameUser = await (User.findOne({ userName: req.body.username.toLowerCase() }));            
            if (usernameUser) {return res.status(400).send({ message: `Failed! Username is already in use!` });}
            const emailUser = await User.findOne({ email: req.body.email.toLowerCase() });
            if (emailUser) { return res.status(400).send({ message: `Failed! Email is already in use!` }); }
            
            next();
        } catch (error) {
            res.status(500).send({message: error.message||"Some error occurred while verifying user."})
        }
    }
}