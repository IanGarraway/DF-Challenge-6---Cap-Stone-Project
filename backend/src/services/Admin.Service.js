import User from "../models/User.model.js";

export default class AdminService{

    getData = async () => {
        const accountData = await User.find({}, { 'password': 0 });        

        if (!accountData) { throw new Error("Invalid data request"); }

        return accountData;
    
    };

}