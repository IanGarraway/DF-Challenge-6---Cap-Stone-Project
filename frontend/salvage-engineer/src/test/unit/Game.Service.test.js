import { afterEach, describe, expect } from "vitest";
import axios from "axios";

import data from '../data/gamedata.json';
import GameService from "../../service/Game.Service.js";

vi.mock('axios');

describe(`Game Service tests`, () => {
    const mockData = data.data;

    
    
    
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
        
    });


    describe(`Get game data tests`, () => {

        test(`should send get request to admin/getdata`, async () => {
            //arrange
            const mockResponsePayload = { status: 200, data: mockData };
            
            axios.get.mockResolvedValue(mockResponsePayload);

            //act
            const response = await GameService.getData();

            //assert
            expect(response.data).to.equal(mockData)
            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3000/data',
                { withCredentials: true }
            );

        });

        test(`get data should be able to handle failed `, async () => {
            //arrange
            const mockResponsePayload = { status: 401, message: "Unauthorised" };
            
            axios.get.mockResolvedValue(mockResponsePayload);

            //act                     

            //assert
            await expect(GameService.getData()).rejects.toThrow("Unauthorised");
            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3000/data',
                { withCredentials: true }
            );

        });

    });
});