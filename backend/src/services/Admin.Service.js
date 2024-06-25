import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export default class AdminService{

    getData = async () => {
        const accountData = await User.find({}, { 'password': 0 });        

        if (!accountData) { throw new Error("Invalid data request"); }

        return accountData;
    
    };

    promote = async (req) => {
        try {
            
            const account = await User.findById(req.body.accountId)
            
            if (!account) { throw new Error("Invalid account data"); }            

            account.admin = true;            

            await account.save();

            return account;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    delete = async (req) => {
        try {
            const account = await User.findById(req.body.accountId)
            
            if (!account) { throw new Error("Invalid account data"); }
            
            await account.deleteOne();

            return account;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    changePassword = async (req) => {
        try {
            const account = await User.findById(req.body.accountId)

            if (!account) { throw new Error("Invalid account data"); }

            account.userPassword = bcrypt.hashSync(req.body.newpassword, 10);

            await account.save();
            
            return account;                
        } catch (e) {
            throw new Error(e.message);
        }
    }

}