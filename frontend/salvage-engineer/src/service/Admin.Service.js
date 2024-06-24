import httpService from "./httpService.js";

const apiURL = import.meta.env.VITE_API_URL;

export default class AdminService{

    static async getData() {
        try {
            const response = await httpService.get(`${apiURL}/admin/data`,{
                withCredentials: true
            
            });
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message)
            }
            
        } catch (e) {
            console.error(`Error creating account`, e);
            throw e;
        }
    } 
}