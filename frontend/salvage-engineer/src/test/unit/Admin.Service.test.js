import { afterEach, describe, expect } from "vitest";
import axios from "axios";

import data from '../data/users.json';
import AdminService from "../../service/Admin.Service.js";

vi.mock('axios');

describe(`Admin Service tests`, () => {
    const mockData = data.data;

    
    
    
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
        
    });


    describe(`Get Service tests`, () => {

        test(`should send get request to admin/getdata`, async () => {
            //arrange
            const mockResponsePayload = { status: 200, data: mockData } ;            
            
            axios.get.mockResolvedValue(mockResponsePayload);

            //act
            const response = await AdminService.getData();            

            //assert
            expect(response.data).to.be.an('array').that.has.lengthOf(20)
            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3000/admin/data',                
                { withCredentials: true }
            );

        });

        test(`get admin data should be able to handle failed `, async () => {
            //arrange
            const mockResponsePayload = { status: 401, message: "Unauthorised" } ;            
            
            axios.get.mockResolvedValue(mockResponsePayload);

            //act                     

            //assert
            await expect(AdminService.getData()).rejects.toThrow("Unauthorised");
            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3000/admin/data',                
                { withCredentials: true }
            );

        });

    });
});