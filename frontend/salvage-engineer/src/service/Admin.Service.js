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

    static async promote(accountid) {
        try {
            const response = await httpService.post(`${apiURL}/admin/promote`, {
                "accountId" : accountid},
                {
                withCredentials: true
            
                });
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.body.message)
            }
        } catch (e) {
            console.error(`Error Promoting account`, e);
            throw e;
        }
    }
    static async delete(accountid) {
        try {
            const response = await httpService.post(`${apiURL}/admin/delete`, {
                "accountId" : accountid},
                {
                withCredentials: true
            
                });
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.body.message)
            }
        } catch (e) {
            console.error(`Error Deleting account`, e);
            throw e;
        }
    }
}