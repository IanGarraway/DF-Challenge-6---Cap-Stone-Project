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
import { response } from "express";





describe("Tests of Account routes", () => {

    let seServer;
    let accountService;
    let adminService;
    let gameService;
    let database;
    let request;
    let token;

    const newTestUser = {
        "username": "TestGuy",
        "password": "Test!123",
        "email": "testguy@test.com",
        "name": "Test Guy"
    };

    const newTestLogin = {
        "username": "TestGuy",
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
        seServer.start();

        request = supertest(seServer.getApp());
        
    })

    after(async () => {
        await seServer.close();
        await database.close();
    })

    //database reset

    afterEach(async () => {
        try {
            await User.deleteMany();
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing out users");
            throw new Error(e.message);
        }
    });

    describe("New User Tests", () => {
        


        describe("Post request to /newuser when the user doesn't exist in the database", () => {
            it("Should respond with User was registered sucessfully", async () => {
                //Arrange

                //Act
                const response = await request.post("/auth/newuser").send(newTestUser);  
                


                //Assert
                expect(response.status).to.equal(201);
                expect(response.body).to.have.property("message").that.includes("User was registered successfully");

                const dbData = await User.find({});                
                expect(dbData).to.be.an('array').that.has.lengthOf(1);
            });
        });

        describe("Post request to /newuser with a username already taken error ", () => {
            it("should response with 400 user already exists",async () => {
                //Arrange
                const aUser = new User({
                    userName: "TestGuy",
                    userPassword: "test",
                    email: "test.guy@test.com",
                    name: "Test Guy",
                    admin: false
                });
                await aUser.save();

                //Act
                const response = await request.post("/auth/newuser").send(newTestUser);

                //Assert
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property("message").that.includes("Failed! Username is already in use!");

            })
        })

        describe("Post request to /newuser with a email already taken error ", () => {
            it("should response with 400 email already exists",async () => {
                //Arrange
                const aUser = new User({
                    userName: "TestGuy2",
                    userPassword: "test",
                    email: "testguy@test.com",
                    name: "Test Guy",
                    admin: false
                });
                await aUser.save();

                //Act
                const response = await request.post("/auth/newuser").send(newTestUser);

                //Assert
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property("message").that.includes("Failed! Email is already in use!");

            })
        })

        describe("Post request to /newuser with no data ", () => {
            it("should response with 422 validation fail",async () => {
                //Arrange                

                //Act
                const response = await request.post("/auth/newuser");

                //Assert
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property("message").that.includes("Validation failed");

            })
        })

        describe("Post request to /newuser with invalid data - name ", () => {
            it("should response with 422 validation fail",async () => {
                //Arrange  
                const badUserData = {
                    "username": "",
                    "password": "!testPAss123",
                    "name": "TestGal",
                    "email": "Test.Gal@testing.com"
                }

                //Act
                const response = await request.post("/auth/newuser");

                //Assert
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property("message").that.includes("Validation failed");

            })
        })
        describe("Post request to /newuser with invalid data - password ", () => {
            it("should response with 422 validation fail",async () => {
                //Arrange  
                const badUserData = {
                    "username": "TestGal",
                    "password": "bad",
                    "name": "Test Gal",
                    "email": "Test.Gal@testing.com"
                }

                //Act
                const response = await request.post("/auth/newuser");

                //Assert
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property("message").that.includes("Validation failed");

            })
        })
        describe("Post request to /newuser with invalid data - name ", () => {
            it("should response with 422 validation fail",async () => {
                //Arrange  
                const badUserData = {
                    "username": "TestGal",
                    "password": "Valid!pa55",
                    "name": "",
                    "email": "Test.gal@testing.com"
                }

                //Act
                const response = await request.post("/auth/newuser");

                //Assert
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property("message").that.includes("Validation failed");

            })
        })
        describe("Post request to /newuser with invalid data - email", () => {
            it("should response with 422 validation fail",async () => {
                //Arrange  
                const badUserData = {
                    "username": "TestGal",
                    "password": "Valid!pa55",
                    "name": "Test Gal",
                    "email": "not an email"
                }

                //Act
                const response = await request.post("/auth/newuser");

                //Assert
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property("message").that.includes("Validation failed");

            })
        })
    })

    describe("Login tests", () => {

        describe("Test that submitting the correct password logs you in and sends a token", () => {
            it("will respond with 200 and the users username and token.", async () => {
                //Arrange
                await request.post("/auth/newuser").send(newTestUser);                

                //Act
                const response = await request.post("/auth/login").send(newTestLogin);                

                //Assert
                expect(response.status).to.equal(200);
                expect(response.headers['set-cookie']).to.satisfy(cookies => cookies.some(cookie => cookie.startsWith('token=')));

                
            });
        });

        describe("Test that submitting the incorrect password doesn't log you in and or send a token", () => {
            it("will respond with 401.", async () => {
                //Arrange
                await request.post("/auth/newuser").send(newTestUser); 
                
                const testLogin = {
                    "username": "TestGuy",
                    "password": "Test!124"}

                //Act
                const response = await request.post("/auth/login").send(testLogin);                

                //Assert
                expect(response.status).to.equal(401);                
                expect(response.headers).to.not.have.property('set-cookie');
            });
        });

        describe("Test that submitting the incorrect data doesn't log you in and or send a token - missing password", () => {
            it("will respond with 401.", async () => {
                //Arrange
                await request.post("/auth/newuser").send(newTestUser); 
                
                const testLogin = {
                    "username": "TestGuy",
                    "password": ""}

                //Act
                const response = await request.post("/auth/login").send(testLogin);                

                //Assert
                expect(response.status).to.equal(401);                
                expect(response.headers).to.not.have.property('set-cookie');
            });
        });

        describe("Test that submitting the incorrect data doesn't log you in and or send a token - missing username", () => {
            it("will respond with 401.", async () => {
                //Arrange
                await request.post("/auth/newuser").send(newTestUser); 
                
                const testLogin = {
                    "username": "",
                    "password": "somepassword"}

                //Act
                
                const response = await request.post("/auth/login").send(testLogin);                

                //Assert
                expect(response.status).to.equal(401);                
                expect(response.headers).to.not.have.property('set-cookie');
            });
        });

        describe("Test that submitting the correct password logs you in and sends a token", () => {
            it("will respond with 200 and the users username and token.", async () => {
                //Arrange
                await request.post("/auth/newuser").send(newTestUser); 
                
                let testUser = await User.findOne({ userName: "TestGuy" });                
                testUser.admin = true;                
                await testUser.save();
                

                //Act
                const response = await request.post("/auth/login").send(newTestLogin);                

                //Assert
                expect(response.status).to.equal(200);
                expect(response.headers['set-cookie']).to.satisfy(cookies => cookies.some(cookie => cookie.startsWith('token=')));
                
                expect(response.body).to.have.property('admin').which.is.true;

                
            });
        });
    });

    describe("Change password tests", () => {
        
        beforeEach(async () => {
            await request.post("/auth/newuser").send(newTestUser);
            
            const response = await request.post("/auth/login").send(newTestLogin);
            const tokenCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
            token = tokenCookie.split(';')[0].split('=')[1];
            
        });
        describe("Test a successful password change ", () => {
            it("should respond with 200 - password changed", async () => {
                //Arrange
                const oldPass = "Test!123";
                const newPass = "Test!1234"
                const newLogin = {
                    "username": "TestGuy",
                    "password": newPass
                };
                const payload = { "oldpassword": oldPass, "newpassword": newPass };

                let users = await User.find();                
               
                //Act                
                const response = await request.post("/auth/changepassword")
                    .set('Cookie', `token=${token}`)
                    .send(payload);
                
                users = await User.find();                
                
                const loginRes = await request.post("/auth/login").send(newLogin);

                //Assert
                expect(response.status).to.equal(200);
                expect(loginRes.status).to.equal(200);
                expect(loginRes.headers['set-cookie']).to.satisfy(cookies => cookies.some(cookie => cookie.startsWith('token=')));
            });
        });

        describe("Test a unsuccessful password change, with wrong original password ", () => {
            it("should respond with 200 - password changed", async () => {
                //Arrange
                const oldPass = "Test!1234";
                const newPass = "Test!1234"
                const newLogin = {
                    "username": "TestGuy",
                    "password": newPass
                };
                const payload = { "oldpassword": oldPass, "newpassword": newPass };

                let users = await User.find();                
               
                //Act                
                const response = await request.post("/auth/changepassword")
                    .set('Cookie', `token=${token}`)
                    .send(payload);
                
                users = await User.find();                
                
                const loginRes = await request.post("/auth/login").send(newLogin);

                //Assert
                expect(response.status).to.equal(401);
                expect(loginRes.status).to.equal(401);
                
            });
        });
    });

    describe('Delete Account tests', () => { 
        let testPass;

        beforeEach(async () => {
            await request.post("/auth/newuser").send(newTestUser);
            
            const response = await request.post("/auth/login").send(newTestLogin);
            const tokenCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
            token = tokenCookie.split(';')[0].split('=')[1];

            testPass = "Test!123";
            
        });

        it("Should response with 200 - account deleted", async() => {
            //Arrange
            const payload = { "password": testPass };

            //Act

            const response = await request.post("/auth/deleteaccount")
                .set('Cookie', `token=${token}`)
                .send(payload);
            
            const users = await User.find({});
            console.log(users, `<--`);

            //Assert

            expect(response.status).to.equal(200);
            expect(response.headers['set-cookie']).to.satisfy(cookies => cookies.some(cookie => cookie.startsWith('token=')));
            expect(response.body).to.have.property("message").that.includes("Account deleted");

            

            expect(users).to.be.an('array').that.has.lengthOf(0);
            
        })
     })

    


});