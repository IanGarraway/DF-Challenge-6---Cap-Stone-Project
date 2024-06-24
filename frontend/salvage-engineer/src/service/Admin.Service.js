import httpService from "./httpService.js";

export default class AdminService{

    static async getData() {
        try {
            const response = await httpService.get(
                'http://localhost:3000/getAccounts');
                
            return response;
        } catch (e) {
            console.error(`Error creating account`, e);
            throw e;
        }
    } 
}