import httpService from "./httpService.js";

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

    static async changePart(part) {
        
        try {
            const response = await httpService.patch(`${apiURL}/changepart`, {
                part: part
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        }catch (e) {
            console.error(`Error getting data`, e);
            throw e;
        }
    }

    static async scrapPart(part) {
        try {
            const response = await httpService.post(`${apiURL}/scrappart`, {
                part: part
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        }catch (e) {
            console.error(`Error getting data`, e);
            throw e;
        }
    }

    static async changePower(power) {
        try {
            const response = await httpService.patch(`${apiURL}/power`, {
                power: power
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        }catch (e) {
            console.error(`Error getting data`, e);
            throw e;
        }
    
    }

}