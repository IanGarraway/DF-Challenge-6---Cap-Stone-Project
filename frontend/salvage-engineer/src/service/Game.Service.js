import httpService from "./httpService.js";
import data from "../../../data/gamedata.json" with{type: "json"};


const apiURL = import.meta.env.VITE_API_URL;
    
export default class GameService{

    static async getData() {
        try {
            const response = await httpService.get(`${apiURL}/data`,{
                withCredentials: true            
            });
            
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message)
            }
            
        } catch (e) {
            console.error(`Error getting data`, e);
            throw e;
        }
    }

}