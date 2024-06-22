import httpService from "./httpService";



const apiURL = import.meta.env.VITE_API_URL;

export default class AccountService{    

    static async login(username, password) {
        console.log(password);
        
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
            } );
            console.log(response, `<---newuser`);
            return response;
        } catch (e) {
            console.error(`Error creating account`, e);
            throw e;
        }
    }


}