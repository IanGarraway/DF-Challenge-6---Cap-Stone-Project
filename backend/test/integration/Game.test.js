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

import User from "../../src/models/User.model.js";

import jwt from "jsonwebtoken";
import { response } from "express";


import userData from "../data/users.json" assert { type: "json" }
import GameData from "../../src/models/gamedata.model.js";


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
        
        
    })
    

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
                mockGameData.lastGen = Date.now() - 60000
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(2)
        
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
                await mockGameData.save();                

                //act
                const response = await request.get("/data").set('Cookie', `token=${token}`);
           

                //assert
            
                expect(response.status).to.equal(200);                
                expect(response.body).to.have.property("partsStorage").to.be.an('array').lengthOf(10)
        
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
});