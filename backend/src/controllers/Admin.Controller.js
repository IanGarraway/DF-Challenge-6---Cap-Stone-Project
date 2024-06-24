import AdminService from "../services/Admin.Service.js";


export default class AdminController{
    #adminService

    constructor(adminService = new AdminService()) {
        this.#adminService = adminService;
    }



    getData = async (req, res) => {        
        try {            
            if (!(req.admin)) { return res.status(401).send({ message: "Unauthorised" }); }
            
            const accountData = await this.#adminService.getData();
            return res.status(200).send(accountData);
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
        
    }
    
}