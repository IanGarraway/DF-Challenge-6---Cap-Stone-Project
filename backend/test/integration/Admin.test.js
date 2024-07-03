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
import GameData from "../../src/models/GameData.model.js";

import jwt from "jsonwebtoken";
import { response } from "express";


import userData from "../data/users.json" assert { type: "json" }


describe("Tests of Admin routes", () => {

    let seServer;
    let accountService;
    let adminService;
    let gameService;
    let database;
    let request;
    let token;
    let expiredToken

    let nonAdminToken;

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

        const user = await User.findOne({ userName: "testadmin" });
        user.admin = true;
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
        
        await addUsers(userData);

        const users = await User.find({});
        console.log(users.length, ' test accounts in db');

        const notAdminResponse = await request.post("/auth/login").send({ "username": "user1", "password": "Testpass!1" });
        const tokenCookie2 = notAdminResponse.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
        nonAdminToken = tokenCookie2.split(';')[0].split('=')[1];
        
        
    })

    function thing() {
        
    }
    async function addUsers(userData) {
        for (const userd of userData) {
            const payload = {
                "username": userd.username,
                "password": userd.password,
                "name": userd.name,
                "email": userd.email
            }
            
            await request.post("/auth/newuser").send(payload);
            setTimeout(thing, 1);
            
        }
    }

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

    describe("Get Admin data tests", () => {
        
        it("should return 200 when a request with authorisation, gets the data", async () => {
            //arrange

            //act
            const response = await request.get("/admin/data").set('Cookie', `token=${token}`);
            //console.log(response);

            //assert

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.has.lengthOf(21);
        })

    

    
        it("should return 401 unauthorised if there is no cookie", async () => {
            //arrange

            //act
            const response = await request.get("/admin/data");
            //console.log(response);

            //assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        })

    
        it("should return 401 unauthorised with an expired cookie", async () => {
            //arrange

            //act
            const response = await request.get("/admin/data").set('Cookie', `token=${expiredToken}`);
            //console.log(response);

            //assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        })

    
        it("should return 401 unauthorised with a non admin cookie", async () => {
            //arrange

            //act
            const response = await request.get("/admin/data").set('Cookie', `token=${nonAdminToken}`);
            //console.log(response);

            //assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        })

    })

    describe("Post Admin promote tests", () => {
        it("Should change a users admin status to admin: true", async () => {
            //Arrange
            const testUser = "user3";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/promote").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("message").that.includes("Account promoted");
        });

        it("Should handle an invalid account name", async () => {
            //Arrange
            const testUser = "badAccount";
            
            const payload = { accountId: testUser };

            //Act

            const response = await request.post("/admin/promote").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property("message").that.includes("Cast to ObjectId failed");
        });

        it("Should refuse with no token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/promote").send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with non admin token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/promote").set('Cookie', `token=${nonAdminToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with expired token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/promote").set('Cookie', `token=${expiredToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });
        
    });

    describe("Post Admin delete tests", () => {
        it("Should delete an account", async () => {
            //Arrange
            const testUser = "user5";

            const testUserData = await User.findOne({ userName: testUser });
            
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/delete").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("message").that.includes("Account deleted");

            const users = await User.find({});

            expect(users).to.be.an('array').that.has.lengthOf(20);
        });

        it("Should handle an invalid account name", async () => {
            //Arrange
            const testUser = "badAccount";
            
            const payload = { accountId: testUser };

            //Act

            const response = await request.post("/admin/delete").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property("message").that.includes("Cast to ObjectId failed");
        });

        it("Should refuse with no token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/delete").send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with non admin token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/delete").set('Cookie', `token=${nonAdminToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with expired token", async () => {
            //Arrange
            const testUser = "user4";

            const testUserData = await User.findOne({ userName: testUser });            

            expect(testUserData.admin).to.be.false;
            const testUserID = testUserData._id;
            const payload = { accountId: testUserID };

            //Act

            const response = await request.post("/admin/delete").set('Cookie', `token=${expiredToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });


    });

    describe("Post change password tests", () => {
        it("Should change the password of an account", async () => {
            //Arrange
            const testUser = "user6";
            const newTestPass = "Testpass!2"

            const testUserData = await User.findOne({ userName: testUser });
            
            const testUserID = testUserData._id;
            const payload = { "accountId": testUserID, "newpassword": newTestPass };

            const login = { username: testUser, password: newTestPass };

            //Act

            const response = await request.post("/admin/changepassword").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("message").that.includes("Password updated");

            const loginResponse = await request.post("/auth/login").send(login);

            expect(loginResponse.status).to.equal(200);
            expect(loginResponse.headers['set-cookie']).to.satisfy(cookies => cookies.some(cookie => cookie.startsWith('token=')));

            
        });

        it("Should handle an invalid account name", async () => {
            //Arrange
            const testUser = "badAccount";
            const testPass = "Bad!pas5";
            
            const payload = {
                accountId: testUser,
                password: testPass
             };

            //Act

            const response = await request.post("/admin/changepassword").set('Cookie', `token=${token}`).send(payload);

            //Assert

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property("message").that.includes("Cast to ObjectId failed");
        });

        it("Should refuse with no token", async () => {
            //Arrange
            const testUser = "user6";
            const newTestPass = "Testpass!2"

            const testUserData = await User.findOne({ userName: testUser });
            
            const testUserID = testUserData._id;
            const payload = { "accountId": testUserID, "newpassword": newTestPass };          
            
            //Act

            const response = await request.post("/admin/changepassword").send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with non admin token", async () => {
            //Arrange
           const testUser = "user6";
            const newTestPass = "Testpass!2"

            const testUserData = await User.findOne({ userName: testUser });
            
            const testUserID = testUserData._id;
            const payload = { "accountId": testUserID, "newpassword": newTestPass };

            //Act

            const response = await request.post("/admin/changepassword").set('Cookie', `token=${nonAdminToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });

        it("Should refuse with expired token", async () => {
            //Arrange
            const testUser = "user6";
            const newTestPass = "Testpass!2"

            const testUserData = await User.findOne({ userName: testUser });
            
            const testUserID = testUserData._id;
            const payload = { "accountId": testUserID, "newpassword": newTestPass };

            //Act

            const response = await request.post("/admin/changepassword").set('Cookie', `token=${expiredToken}`).send(payload);

            //Assert

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property("message").that.includes("Unauthorised");
        });


    });

});