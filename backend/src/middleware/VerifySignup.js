import User from "../models/User.model.js";

export default class VerifySignup{

    static userUnique = async (req, res, next) =>{
        try {
            const user = User;

            const usernameUser = await (user.findOne({ userName: req.body.username }));
            if (usernameUser) {return res.status(400).send({ message: `Failed! Username is already in use!` });}

            const emailUser = await user.findOne({ email: req.body.email });
            if (emailUser) { return res.status(400).send({ message: `Failed! Email is already in use!` }); }
            
            next();
        } catch (error) {
            res.status(500).send({message: error.message||"Some error occurred while verifying user."})
        }
    }
}