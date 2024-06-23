
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import AccountManagement from "../../pages/AccountManagement";

describe("Account Management page tests", () => {
    describe("Change Password tests", () => {
        test('it should render original and new password boxes', () => {
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            expect(screen.getByTestId("oldPassword")).toBeInTheDocument();
            expect(screen.getByTestId("newPassword")).toBeInTheDocument();
        
        });
    
        test('it should render change password fields as invalid with no data', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")

            //Act
            await userEvent.click(cpButton);

            //Assert
            expect(newPasswordField).toHaveClass("form-control is-invalid");
            expect(oldPasswordField).toHaveClass("form-control is-invalid");

        
        });

        test('it should render change password fields as valid if valid data is entered', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "Ab!12345" } });
            fireEvent.change(oldPasswordField, {target:{value: "Ab!12345"}})

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-valid");
                expect(oldPasswordField).toHaveClass("form-control is-valid");
            })

        
        });

        test('it should render change password fields as invalid if only partial data is entered', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "Ab!1234" } });
            fireEvent.change(oldPasswordField, {target:{value: "Ab!1234"}})

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-invalid");
                expect(oldPasswordField).toHaveClass("form-control is-invalid");
            })

        
        });

        test('it should render change password fields as invalid no capital', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "ab!12345" } });

            await userEvent.click(cpButton);
            

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-invalid");
                expect(oldPasswordField).toHaveClass("form-control is-invalid");
                
            })

        
        });

        test('it should render change password fields as invalid no lowercase', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "AB!12345" } });

            await userEvent.click(cpButton);
            

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-invalid");
                expect(oldPasswordField).toHaveClass("form-control is-invalid");
                
            })

        
        });
        test('it should render change password fields as invalid no special', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "AbC12345" } });

            await userEvent.click(cpButton);
            

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-invalid");
                expect(oldPasswordField).toHaveClass("form-control is-invalid");
                
            })

        
        });
        test('it should render change password fields as invalid no number', async() => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            const newPasswordField = screen.getByTestId("newPassword");
            const oldPasswordField = screen.getByTestId("oldPassword");
            const cpButton = screen.getByTestId("cpButton")
            
            await userEvent.click(cpButton);

            //Act
            fireEvent.change(newPasswordField, { target: { value: "Ab!cdefg" } });

            await userEvent.click(cpButton);
            

            //Assert

            await waitFor(() => {
                expect(newPasswordField).toHaveClass("form-control is-invalid");
                expect(oldPasswordField).toHaveClass("form-control is-invalid");
                
            });
        
        });       

    });

    describe('Delete Account Tests', () => {
        test('it should render a switch a password box and a delete account button', () => {
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )

            expect(screen.getByTestId("deleteSwitch")).toBeInTheDocument();
            expect(screen.getByTestId("deletePassword")).toBeInTheDocument();
            expect(screen.getByTestId("deleteButton")).toBeInTheDocument();
        
        });

        test('the delete button is disabled if the switch is off', () => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )
            

            //Act

            //Assert            
            expect(screen.getByTestId("deleteButton")).toBeDisabled();
        
        });

        test('the delete button is not disabled if the switch is on', async () => {
            //Arrange
            render(
                <AccountManagement
                />,
                { wrapper: MemoryRouter }
            )
            
            const deleteSwitch = screen.getByTestId("deleteSwitch");

            //Act

            await userEvent.click(deleteSwitch);

            //Assert            
            expect(screen.getByTestId("deleteButton")).not.toBeDisabled();
        
        });
     })
})