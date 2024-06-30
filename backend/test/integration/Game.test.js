import { expect } from "chai";
import supertest from "supertest";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";

import AccountController from "../../src/controllers/Account.Controller.js";
import AccountRoutes from "../../src/routes/Account.Routes.js";
import AccountService from "../../src/services/Account.Service.js";

import AdminController from "../../src/controllers/Admin.Controller.js";
import AdminRoutes from "../../src/routes/Admin.Routes.js";
import AdminService from "../../src/services/Admin.Service.js";

import GameController from "../../src/controllers/Game.Controller.js";
import GameRoutes from "../../src/routes/Game.Routes.js";
import GameService from "../../src/services/Game.Service.js";

import GameData from "../../src/models/gamedata.model.js";
import User from "../../src/models/User.model.js";

import jwt from "jsonwebtoken";
import { response } from "express";


import userData from "../data/users.json" assert { type: "json" }


describe("Tests of Game routes", () => {

    let seServer;
    let accountService;
    let adminService;
    let gameService;
    let database;
    let request;
    let token;
    let expiredToken

    let nonAdminToken;
    let userId;

    const adminTestUser = {
        "username": "TestAdmin",
        "password": "Test!123",
        "email": "testguy@test.com",
        "name": "Test Admin"
    };

    const adminTestLogin = {
        "username": "TestAdmin",
        "password": "Test!123"
    }
    

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI, ORIGIN } = process.env;

        accountService = new AccountService();
        adminService = new AdminService();
        gameService = new GameService();

        const accountController = new AccountController(accountService);
        const adminController = new AdminController(adminService);
        const gameController = new GameController(gameService);

        const accountRoutes = new AccountRoutes(ORIGIN);
        const adminRoutes = new AdminRoutes(ORIGIN);
        const gameRoutes = new GameRoutes(ORIGIN);

        database = new Database(DB_URI);
        await database.connect();

        seServer = new Server(PORT, HOST, accountRoutes, adminRoutes, gameRoutes, ORIGIN);
        await seServer.start();

        request = supertest(seServer.getApp());

        await request.post("/auth/newuser").send(adminTestUser);

        const user = await User.findOne({ userName: "TestAdmin" });
        user.admin = true;
        userId = user._id;
        user.save();

        const response = await request.post("/auth/login").send(adminTestLogin);
        const tokenCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
        token = tokenCookie.split(';')[0].split('=')[1];

        
        

        expiredToken = jwt.sign({
            id: user._id,
            username: user.userName,
            admin: user.admin
        }, process.env.SECRET, {
            expiresIn: 0,
        });
        
        const notAdminAcc = {
            "username": "user1",
            "password": "Testpass!1",
            "email": "user1@test.com",
            "name": "Test Not Admin"
        }

        const res = await request.post("/auth/newuser").send(notAdminAcc);

        const notAdminResponse = await request.post("/auth/login").send({ "username": "user1", "password": "Testpass!1" });
        
        const tokenCookie2 = notAdminResponse.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
        nonAdminToken = tokenCookie2.split(';')[0].split('=')[1];
        
        
    });
    

    after(async () => {
        try {
            await User.deleteMany();
            await GameData.deleteMany();
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing out users");
        }
        await seServer.close();
        await database.close();
    })

    describe("Get game data tests", () => {
        
        it("should return 200 when a request with authorisation, gets the data", async () => {
            //arrange

            //act
            const response = await request.get("/data").set('Cookie', `token=${token}`);
           

            //assert
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("lastGen");
            expect(response.body).to.have.property("inventory").to.have.property("credits");
        })

        it("should return 401 when a request without authorisation, dosen't get the data", async () => {
            //arrange

            //act
            const response = await request.get("/data")
           

            //assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");;
           
        })

        it("should return 401 unauthorised with an expired cookie", async () => {
            //arrange

            //act
            const response = await request.get("/data").set('Cookie', `token=${expiredToken}`);
            //console.log(response);

            //assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        })

        describe("Part generation tests", () => {
            let mockGameData;
            

            beforeEach(async () => {
                mockGameData = await GameData.findOne({ userID: userId });
                
                mockGameData.partsStorage = [];
                
                await mockGameData.save();
            })
            it("should give two parts", async() => {                
                //arrange
                mockGameData.lastGen = Date.now() - 60000;
                mockGameData.lastResourceGen = Date.now() - 60000;
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
                // console.log(response.body, `test body`);
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(2);
                expect(response.body.inventory).to.have.property("t1Metal").to.equal(0.2);
        
            })

            it("should give 0 parts", async() => {                
                //arrange
                mockGameData.lastGen = Date.now() 
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(0)
        
            })

            it("should give 10 parts", async() => {                
                //arrange
                mockGameData.lastGen = Date.now() - 1200000
                mockGameData.lastResourceGen = Date.now() - 1200000
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(10)
                expect(response.body.inventory).to.have.property("t1Metal").to.equal(4.4);
        
            })

            it("should give 12 parts if the cap is higher", async() => {                
                //arrange
                mockGameData.lastGen = Date.now() - 1200000
                mockGameData.caps.partsCap = 12;
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(12)
        
            })

            it("should give 5 more parts, in addition to the mock ones", async() => {                
                //arrange
                mockGameData.lastGen = Date.now() - 1200000
                mockGameData.caps.partsCap = 10;
                mockGameData.partsStorage = [
                    { name: "mockpart", type: "mockType", manufacturer: "fakeCorp", mlogo: "fake.jpg", maxQual: 5 },
                    { name: "mockpart", type: "mockType", manufacturer: "fakeCorp", mlogo: "fake.jpg", maxQual: 5 },
                    { name: "mockpart", type: "mockType", manufacturer: "fakeCorp", mlogo: "fake.jpg", maxQual: 5 },
                    { name: "mockpart", type: "mockType", manufacturer: "fakeCorp", mlogo: "fake.jpg", maxQual: 5 },
                    { name: "mockpart", type: "mockType", manufacturer: "fakeCorp", mlogo: "fake.jpg", maxQual: 5 }
                ]
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(10)
                expect(response.body.partsStorage[0].name).to.equal("mockpart");
                expect(response.body.partsStorage[4].name).to.equal("mockpart");
                expect(response.body.partsStorage[5].name).not.to.equal("mockpart");
                expect(response.body.partsStorage[9].name).not.to.equal("mockpart");
        
            })
        })

    });

    describe("Change part(patch) route tests", () => {
        let mockGameData;
        let mockParts = [{
            "name": "Novatech Motor mk2",
            "type": "magnetMotor",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "gathSpd": 2,
            "gathVol": 1
        },
        {
            "name": "Novatech Magnet Core mk2",
            "type": "magnetCore",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "maxQual": 1,
            "gathVol": 2
        },
        {
            "name": "Novatech Salvage Scan mk1",
            "type": "magnetCore",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "findTime": 1,
            "maxQual": 1
        },
        {
            "name": "Novatech Smelt Master mk1",
            "type": "smelterControl",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "smeltSpd": 2,
            "smeltTier": 2
        }
        ];
            

        beforeEach(async () => {
            mockGameData = await GameData.findOne({ userID: userId });
                
            mockGameData.partsStorage = mockParts;
                
            await mockGameData.save();
        });

        it("should respond with 200 and the fabrication mock part in smelterControl slot", async () => {
            //Arrange
            const payload = { part: mockParts[3] };

            //Act

            const response = await request.patch("/changepart").send(payload).set('Cookie', `token=${token}`);
            const getResponse = await request.get("/data").set('Cookie', `token=${token}`);

            //Assert
            

            expect(response.status).to.be.equal(200);
            expect(getResponse.body.fabrication.smelterControl.name).to.equal(mockParts[3].name);
            expect(getResponse.body.fabrication.smelterControl.smeltSpd).to.equal(2);
        });

        it("should respond with 200 and the mock part in magnet motor slot", async () => {
            //Arrange

            const payload = { part: mockParts[0] };

            //Act

            const response = await request.patch("/changepart").send(payload).set('Cookie', `token=${token}`);
            const getResponse = await request.get("/data").set('Cookie', `token=${token}`);

            //Assert
            

            expect(response.status).to.be.equal(200);
            expect(getResponse.body.equipment.magnetMotor.name).to.equal(mockParts[0].name);
            expect(getResponse.body.equipment.magnetMotor.gathSpd).to.equal(2);
        });

        it("should refuse a bad part ", async () => {
            //Arrange            

            const mockBadPart = {
                part:{
                    "name": "Novatech Salvage Scam mk1",
                    "type": "magnetCore",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "findTime": 10,
                    "maxQual": 10
                }
            };


            //Act

            const response = await request.patch("/changepart").send(mockBadPart).set('Cookie', `token=${token}`);
            const getResponse = await request.get("/data").set('Cookie', `token=${token}`);

            //Assert
            

            expect(response.status).to.be.equal(422);
            expect(getResponse.body.equipment.magnetMotor.name).to.equal(mockParts[0].name);
            expect(getResponse.body.equipment.magnetMotor.gathSpd).to.equal(2);
        });

        
        it("should respond with 401 if no cookie is sent", async() => {
            //Arrange


            //Act

            const response = await request.patch("/changepart").send(mockParts[0]);
            
            //Assert
           
            expect(response.status).to.be.equal(401);
            
        })

        it("should respond with 401 if no expired cookie is sent", async() => {
            //Arrange
            const payload = { part: mockParts[0] };

            //Act

            const response = await request.patch("/changepart").send(payload).set('Cookie', `token=${expiredToken}`);
            
            //Assert
            
            expect(response.status).to.be.equal(401);
            
        })

        it("should calculate the correct stats", async() => {
            //Arrange
            mockGameData.stats = {
                "grinderSpd": 0,
                "grinderVol": 0,
                "grinderStr": 0,
                "smeltSpd": 0,
                "smeltTier": 0,
                "maxQual": 0,
                "gathSpd": 0,
                "gathVol": 0,
                "speed": 0,
                "zone": 0
            };

            const payload = { part: mockParts[1] };


            //Act

            const response = await request.patch("/changepart").send(payload).set('Cookie', `token=${token}`);
            const getResponse = await request.get("/data").set('Cookie', `token=${token}`);
            //Assert
            
            let { stats } = getResponse.body;            

            expect(response.status).to.be.equal(200);
            expect(getResponse.body.equipment.magnetCore.name).to.equal(mockParts[1].name);
            expect(stats.grinderSpd).to.equal(1);
            expect(stats.grinderVol).to.equal(1);
            expect(stats.grinderStr).to.equal(1);
            expect(stats.smeltSpd).to.equal(1);
            expect(stats.smeltTier).to.equal(1);
            expect(stats.maxQual).to.equal(3);
            expect(stats.gathVol).to.equal(7);
            expect(stats.gathSpd).to.equal(3);
            expect(stats.speed).to.equal(1);
            expect(stats.zone).to.equal(1);
            
        })
        
    })

    describe('tests of the scrappart route', () => { 
        let mockGameData;
        let mockParts = [{
            "name": "Novatech Motor mk2",
            "type": "magnetMotor",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "gathSpd": 2,
            "gathVol": 1
        },
        {
            "name": "Novatech Magnet Core mk2",
            "type": "magnetCore",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "maxQual": 1,
            "gathVol": 2
        },
        {
            "name": "Novatech Salvage Scan mk1",
            "type": "magnetCore",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "findTime": 1,
            "maxQual": 1
        },
        {
            "name": "Novatech Smelt Master mk1",
            "type": "smelterControl",
            "manufacturer": "Salvage Tech",
            "mlogo": "salvageTechLogo.png",
            "smeltSpd": 2,
            "smeltTier": 2
        }
        ];
            

        beforeEach(async () => {
            mockGameData = await GameData.findOne({ userID: userId });
                
            mockGameData.partsStorage = mockParts;
            mockGameData.inventory.t1Metal = 0
            mockGameData.inventory.t2Metal = 0
            mockGameData.lastGen = Date.now();
            mockGameData.lastResourceGen = Date.now();

            await mockGameData.save();       
            
        });

        it("should respond with 200 and the partsStorage should not contain the mock part", async () => {
            //Arrange
            const payload = { part: mockParts[2] };                        

            //Act
            let response = await request.get("/data").set('Cookie', `token=${token}`);
            
            // console.log(response.body.partsStorage, `before`);
            expect(response.body.partsStorage).to.be.an('array').lengthOf(4);
            

            response = await request.post("/scrappart").send(payload).set('Cookie', `token=${token}`);
            const getResponse = await request.get("/data").set('Cookie', `token=${token}`);

            //Assert   
            // console.log(getResponse.body.partsStorage, `after`);

            expect(response.status).to.be.equal(200);
            expect(getResponse.body.partsStorage).to.be.an('array').lengthOf(3);
            const { partsStorage } = getResponse.body;
            expect(partsStorage[0].name).not.to.equal(mockParts[2].name);
            expect(partsStorage[1].name).not.to.equal(mockParts[2].name);
            expect(partsStorage[2].name).not.to.equal(mockParts[2].name);
            expect(getResponse.body.inventory.t1Metal).to.equal(0.3);
        });

        it("should refuse a bad part ", async () => {
            //Arrange            

            const mockBadPart = {
                part:{
                    "name": "Novatech Salvage Scam mk1",
                    "type": "magnetCore",
                    "manufacturer": "Salvage Tech",
                    "mlogo": "salvageTechLogo.png",
                    "findTime": 10,
                    "maxQual": 10
                }
            };


            //Act

            const response = await request.post("/scrappart").send(mockBadPart).set('Cookie', `token=${token}`);
            

            //Assert
            

            expect(response.status).to.be.equal(422);            
        });

        
        it("should respond with 401 if no cookie is sent", async() => {
            //Arrange


            //Act

            const response = await request.post("/scrappart").send(mockParts[0]);
            
            //Assert
           
            expect(response.status).to.be.equal(401);
            
        })

        it("should respond with 401 if no expired cookie is sent", async() => {
            //Arrange
            const payload = { part: mockParts[0] };

            //Act

            const response = await request.post("/scrappart").send(payload).set('Cookie', `token=${expiredToken}`);
            
            //Assert
            
            expect(response.status).to.be.equal(401);
            
        })

     })
});