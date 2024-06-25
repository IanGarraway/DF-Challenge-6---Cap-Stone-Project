import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import AdminTable from "../../components/AdminTable";

import accountData from '../data/users.json'


describe("Admin page tests", () => {
    describe("Basic display of the admin data", () => {
        test("Displays loading if no data is passed in", () => {
            //Arrange

            //Act
            render(<AdminTable accounts={[]} />,
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
    

        test("Delete button enabled by clicking the switch", async () => {
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
    })


});