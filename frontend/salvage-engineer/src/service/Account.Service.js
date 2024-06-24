import httpService from "./httpService";



const apiURL = import.meta.env.VITE_API_URL;

export default class AccountService{    

    static async login(username, password) {
        try {            
            const response = await httpService.post(`${apiURL}/auth/login`, {
                "username":username,
                "password":password
            }, {
                withCredentials: true
            
            });
            return response;
        } catch (e) {
            console.error(`Error logging in`, e);
            throw e;
        }
    }

    static async newUser( username, password, name, email ) {
        
        try {            
            const response = await httpService.postNew(`${apiURL}/auth/newuser`, {
                "username": username,
                "password": password,
                "name": name,
                "email": email
            }); 
            console.log(response);
            return response;
        } catch (e) {
            console.error(`Error creating account`, e);
            throw e;
        }
    }

    static async changePassword(oldPassword, newPassword) {
        try {
            const response = await httpService.post(`${apiURL}/auth/changepassword`, {
                "oldpassword": oldPassword,
                "newpassword": newPassword
            }, {
                withCredentials: true
            });
            return response;
        } catch (e) {
            console.error(`Error changing password`, e);
            throw e;
        }        
    }

    static async deleteAccount(password) {
        try {
            const response = await httpService.post(`${apiURL}/auth/deleteaccount`, {
                "password": password
            }, {
                withCredentials: true
            });
            return response;
        } catch (e) {
            console.error(`Error changing password`, e);
            throw e;
        }
    }
}