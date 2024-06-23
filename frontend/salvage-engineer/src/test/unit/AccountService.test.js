import { afterEach, describe, expect } from "vitest";
import AccountService from "../../service/AccountService";
import axios from "axios";

vi.mock('axios');

describe(`Account Service tests`, () => {
    let username;
    let password;
    let name;
    let email;
    
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
        username = "testuser";
        password = "password";
        name = "Test Guy";
        email = "test.guy@testing.com";
    });

    describe(`Login tests`, () => {

        test(`should log in successfully`, async () => {
            //arrange
            const mockResponsePayload = { data: { token: 'fake-token', username: 'testuser' } };
            const mockPayload = { username: `testuser`, password: `password` };
            
            axios.post.mockResolvedValue(mockResponsePayload);

            //act
            const response = await AccountService.login(username, password);

            //assert
            expect(response).toStrictEqual(mockResponsePayload);
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/auth/login',
                mockPayload,
                { withCredentials: true }
            );

        });

        test(`should be able to handle a login error`, async () => {
            //arrange
            const mockError = new Error('Login failed');
            axios.post.mockRejectedValue(mockError);
            //Act
            await expect(AccountService.login(username, password)).rejects.toThrow('Login failed');

            //assert
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/auth/login',
                { username: username, password: password },
                { withCredentials: true }
            );            
        });

    });

    describe(`New Account tests`, () => {
        test(`Able to create a new account`, async () => {

            
            const mockResponsePayload = { data: { message: 'created new user' } };
            const mockPayload = { username: username, password: password, name: name, email: email };
            
            axios.post.mockResolvedValue(mockResponsePayload);

            //act
            const response = await AccountService.newUser(username, password, name, email);

            console.log(mockResponsePayload, `<---test`);

            //assert
            expect(response).toStrictEqual(mockResponsePayload);
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/auth/newuser',
                { username: username, password: password, name: name, email: email }
            )
        });

        test(`Able to handle an error`, async () => {
            //arrange
            const mockError = new Error('Login failed');
            axios.post.mockRejectedValue(mockError);
            //Act
            await expect(AccountService.newUser(username, password, name, email)).rejects.toThrow('Login failed');

            //assert
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/auth/newuser',
                { username: username, password: password, name: name, email: email }                
            );       
        })
    });

});