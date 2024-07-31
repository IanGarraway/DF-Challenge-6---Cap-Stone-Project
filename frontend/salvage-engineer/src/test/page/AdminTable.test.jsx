import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect } from "vitest";

import axios from "axios";

import AdminTable from "../../components/AdminTable";

import accountData from '../data/users.json'

const mockBackGround = vi.fn();
const mockGetAccounts = vi.fn();

vi.mock('axios');


describe("Admin page tests", () => {
    describe("Basic display of the admin data", () => {
        test("Displays loading if no data is passed in", () => {
            //Arrange

            //Act
            render(<AdminTable accounts={[]}
                setBackGroundImg={mockBackGround}
            />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            expect(screen.getByText("Loading data...")).toBeInTheDocument();
            
        })

        test("Displays account data if data is passed in", () => {
            //Arrange
            

            //Act
            render(<AdminTable accounts={accountData.data} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            const adminEmails = screen.getAllByTestId("adminEmail");
            const adminNames = screen.getAllByTestId("adminName");

            expect(adminEmails).to.be.an('array').that.has.lengthOf(20);
            expect(adminNames).to.be.an('array').that.has.lengthOf(20);
            
        })

        test("Displays promote Buttons are being rendered", () => {
            //Arrange
            

            //Act
            render(<AdminTable accounts={accountData.data} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            const promoteButtons = screen.getAllByTestId("promoteButton");
            

            expect(promoteButtons).to.be.an('array').that.has.lengthOf(20);
            
            
        })

        test("Displays promote tab disabled if account is admin", () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": true
            }];

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            expect(screen.getByText("Promote")).toBeDisabled();
            
        })

        test("Displays promote tab not disabled if account is not admin", () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            expect(screen.getByText("Promote")).not.toBeDisabled();
            
        })

        test("Promote button enabled by clicking the switch", async () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )

            const promoteSwitch = screen.getByTestId("promoteSwitch");
            const promoteButton = screen.getByTestId("promoteButton");

            expect(promoteButton).toBeDisabled();

            await userEvent.click(promoteSwitch);



            //Assert
            expect(promoteButton).not.toBeDisabled();
            expect(screen.getByText("Promote")).not.toBeDisabled();
            
        })
    

        test("Delete button exists and is enabled by clicking the switch", async () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )

            const deleteSwitch = screen.getByTestId("adminDeleteSwitch");
            const deleteButton = screen.getByTestId("adminDeleteButton");

            expect(deleteButton).toBeDisabled();

            await userEvent.click(deleteSwitch);
            
            //Assert
            expect(deleteButton).not.toBeDisabled();
        })

        

        test("change passwords button exists enabled by clicking the switch", async () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )

            const changeSwitch = screen.getByTestId("changeSwitch");
            const changeButton = screen.getByTestId("changeButton");
            const adminChangePassword = screen.getByTestId("adminChangePassword")

            expect(changeSwitch).toBeInTheDocument();
            expect(adminChangePassword).toBeInTheDocument();
            expect(changeButton).toBeDisabled();

            await userEvent.click(changeSwitch);

            //Assert
            expect(changeButton).not.toBeDisabled();
        })

        
    })

    describe("Admin axios trigger tests", () => {

        

        beforeEach(() => {
            axios.get.mockReset()
            axios.post.mockReset()
        })

        test("adding a password and clicking the change password triggers an axios post", async () => {
            //Arrange
            const testData = [{
                "_id": "2",
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            const mockAccountId = "2";
            const mockNewPassword = "Test123!"
            const mockResponsePayload = { status: 200, body: { message: "Password changed" } }

            axios.post.mockResolvedValue(mockResponsePayload);

            //Act
            render(<AdminTable
                accounts={testData}
                getAccounts={mockGetAccounts}
            
            />,
                { wrapper: MemoryRouter }
                       
            )

            const changeSwitch = screen.getByTestId("changeSwitch");
            const changeButton = screen.getByTestId("changeButton");
            const adminChangePassword = screen.getByTestId("adminChangePassword")

            expect(changeSwitch).toBeInTheDocument();
            expect(adminChangePassword).toBeInTheDocument();
            expect(changeButton).toBeDisabled();

            await userEvent.click(changeSwitch);
            expect(changeButton).not.toBeDisabled();
            fireEvent.change(adminChangePassword, { target: { value: mockNewPassword } });

            await userEvent.click(changeButton);

            //Assert
            
            await waitFor(() => {
            
                expect(axios.post).toHaveBeenCalledWith(
                    'http://localhost:3000/admin/changepassword',
                    {
                        "accountId": mockAccountId,
                        "newpassword": mockNewPassword
                    },
                    { withCredentials: true }
                );
                expect(screen.getByTestId('infoTab')).toHaveClass('active');
            });
        })

        test("adding a password and clicking the change password triggers an axios post and it can handle a bad event", async () => {
            //Arrange
            const testData = [{
                "_id": "2",
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            const mockAccountId = "2";
            const mockNewPassword = "Test123!"
            const mockResponsePayload = { status: 500, body: { message: "invalid account" } }

            axios.post.mockResolvedValue(mockResponsePayload);

            //Act
            render(<AdminTable
                accounts={testData}
                getAccounts={mockGetAccounts}
            
            />,
                { wrapper: MemoryRouter }
                       
            )

            const changeSwitch = screen.getByTestId("changeSwitch");
            const changeButton = screen.getByTestId("changeButton");
            const adminChangePassword = screen.getByTestId("adminChangePassword")

            expect(changeSwitch).toBeInTheDocument();
            expect(adminChangePassword).toBeInTheDocument();
            expect(changeButton).toBeDisabled();

            await userEvent.click(changeSwitch);
            expect(changeButton).not.toBeDisabled();
            fireEvent.change(adminChangePassword, { target: { value: mockNewPassword } });

            await userEvent.click(changeButton);

            //Assert
            
            await waitFor(() => {
            
                expect(axios.post).toHaveBeenCalledWith(
                    'http://localhost:3000/admin/changepassword',
                    {
                        "accountId": mockAccountId,
                        "newpassword": mockNewPassword
                    },
                    { withCredentials: true }
                );

                expect(screen.getByText("invalid account")).toBeInTheDocument();
            });
        });

        test("Delete button sends a request to the admin delete route and on a 200 ", async () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            const mockAccountId = 2

            const mockResponsePayload = { status: 200, body: { message: "account deleted" } }

            axios.post.mockResolvedValue(mockResponsePayload);

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )

            const deleteSwitch = screen.getByTestId("adminDeleteSwitch");
            const deleteButton = screen.getByTestId("adminDeleteButton");

            expect(deleteButton).toBeDisabled();

            await userEvent.click(deleteSwitch);
            expect(deleteButton).not.toBeDisabled();

            await userEvent.click(deleteButton);
            
            //Assert

            await waitFor(() => {
            
                expect(axios.post).toHaveBeenCalledWith(
                    'http://localhost:3000/admin/delete',
                    {
                        "accountId": mockAccountId,                        
                    },
                    { withCredentials: true }
                );
                expect(screen.getByTestId('infoTab')).toHaveClass('active');
            });
        })

        test("Delete button sends a request to the admin delete route and on a 200 ", async () => {
            //Arrange
            const testData = [{
                "_id": 2,
                "userName": "user2",
                "email": "user2@example.com",
                "name": "User 2",
                "admin": false
            }];

            const mockAccountId = 2

            const mockResponsePayload = { status: 200, body: { message: "account promoted" } }

            axios.post.mockResolvedValue(mockResponsePayload);

            //Act
            render(<AdminTable accounts={testData} />,
                { wrapper: MemoryRouter }
                       
            )

            const promoteSwitch = screen.getByTestId("promoteSwitch");
            const promoteButton = screen.getByTestId("promoteButton");

            expect(promoteButton).toBeDisabled();

            await userEvent.click(promoteSwitch);
            expect(promoteButton).not.toBeDisabled();

            await userEvent.click(promoteButton);
            
            //Assert

            await waitFor(() => {
            
                expect(axios.post).toHaveBeenCalledWith(
                    'http://localhost:3000/admin/promote',
                    {
                        "accountId": mockAccountId,                        
                    },
                    { withCredentials: true }
                );
                expect(screen.getByTestId('infoTab')).toHaveClass('active');
            });
        })
        
    })


})