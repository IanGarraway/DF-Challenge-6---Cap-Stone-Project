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
            const account = await this.#adminService.promote(req)

            return res.status(200).send({ message: "Account promoted" });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    delete = async (req, res) => {
        try {
            const account = await this.#adminService.delete(req);            

            return res.status(200).send({ message: "Account deleted" });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    changePassword = async (req, res) => {
        try {
            const account = await this.#adminService.changePassword(req);

            return res.status(200).send({ message: "Password updated" });
        } catch (e) {
            
            return res.status(500).send({ message: e.message });
        }
    }

    
}