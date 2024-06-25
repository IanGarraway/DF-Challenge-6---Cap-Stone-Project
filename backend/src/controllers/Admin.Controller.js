import User from "../models/User.model.js";
import AdminService from "../services/Admin.Service.js";


export default class AdminController{
    #adminService

    constructor(adminService = new AdminService()) {
        this.#adminService = adminService;
    }



    getData = async (req, res) => {        
        try {                                   
            const accountData = await this.#adminService.getData();
            return res.status(200).send(accountData);
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }        
    }

    promote = async (req, res) => {
        try {
            const account = await User.findById(req.body.accountId)
            
            account.admin = true;

            account.save();

            return res.status(200).send({ message: "Account promoted" });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
    
}