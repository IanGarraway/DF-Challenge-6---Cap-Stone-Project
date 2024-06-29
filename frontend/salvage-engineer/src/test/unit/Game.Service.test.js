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

    describe("tests of the patch route Change part", () => {
        const mockPart = {
            name: "mockpart",
            type: "mockType",
            manufacturer: "fakeCorp",
            mlogo: "fake.jpg",
            maxQual: 5 
        }

        test(`changeRoute should send a part`, async () => {
            //arrange
            const mockResponsePayload = { status: 200, message: "part changed" };
            
            axios.patch.mockResolvedValue(mockResponsePayload);
            
            //Act

            const response = await GameService.changePart(mockPart);

            

            //Assert
            expect(response.message).to.equal("part changed")
            expect(response.status).to.equal(200)
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:3000/changepart', {
                "part": mockPart,
            }, {
                withCredentials: true
            }
            );
        });
        test(`change part should be able to handle failed sends `, async () => {
            //arrange
            const mockResponsePayload = { status: 401, message: "Unauthorised" };
            
            axios.patch.mockResolvedValue(mockResponsePayload);

            //act                     

            //assert
            await expect(GameService.changePart(mockPart)).rejects.toThrow("Unauthorised");
            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:3000/changepart',
                {part: mockPart},
                { withCredentials: true }
            );

        });

    })
});