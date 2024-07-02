
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import Login from "../../pages/Login";

// Missing axios mocking tests
describe('Tests for Login page', () => {
    const mockSetUser = vi.fn();
    const mockBackGround = vi.fn();
    
    
    test('it should render username and password', () => {
        render(
            <Login
                setUser={mockSetUser}   
                setBackGroundImg={mockBackGround}
            />,
            { wrapper: MemoryRouter }
        )

        expect(screen.getByTestId("loginUsername")).toBeInTheDocument();
        expect(screen.getByTestId("loginPassword")).toBeInTheDocument();
        
    });

    test('it should render username, password, email address, password and terms', () => {
        render(
            <Login
                setUser={mockSetUser}  
                setBackGroundImg={mockBackGround}
            />,
            { wrapper: MemoryRouter }
        )

        expect(screen.getByTestId("newUsername")).toBeInTheDocument();
        expect(screen.getByTestId("newPassword")).toBeInTheDocument();
        expect(screen.getByTestId("newEmail")).toBeInTheDocument();
        expect(screen.getByTestId("newName")).toBeInTheDocument();
        
    });

    test('it should render all as invalid without data', async () => {
        //Arrange
        render(
            <Login
                setUser={mockSetUser} 
                setBackGroundImg={mockBackGround}
            />,
            { wrapper: MemoryRouter }
        )

        const usernameField = screen.getByTestId("newUsername");
        const passwordField = screen.getByTestId("newPassword")
        const emailField = screen.getByTestId("newEmail");
        const nameField = screen.getByTestId("newName");
        const termsField = screen.getByTestId("newTerms");


        //Act
         await userEvent.click(screen.getByTestId('newButton'));

        //Assert
        expect(usernameField).toHaveClass("form-control is-invalid");
        expect(passwordField).toHaveClass("form-control is-invalid");
        expect(emailField).toHaveClass("form-control is-invalid");
        expect(nameField).toHaveClass("form-control is-invalid");
        expect(termsField).toHaveClass("form-check-input is-invalid");
        
    });

    test('it should render as valid if valid data is entered', async () => {
        //Arrange
        render(
            <Login
                setUser={mockSetUser}
                setBackGroundImg={mockBackGround}
            />,
            { wrapper: MemoryRouter }
        )

        const usernameField = screen.getByTestId("newUsername");
        const passwordField = screen.getByTestId("newPassword")
        const emailField = screen.getByTestId("newEmail");
        const nameField = screen.getByTestId("newName");
        const termsField = screen.getByTestId("newTerms");
        
        await userEvent.click(screen.getByTestId('newButton'));


        //Act
        fireEvent.change(usernameField, { target: { value: "Test" } });
        fireEvent.change(passwordField, { target: { value: "Ab!12345" } });
        fireEvent.change(emailField, { target: { value: "Test@test.com" } });
        fireEvent.change(nameField, { target: { value: "Test" } });
        fireEvent.change(termsField, { target: { value: true } });

        //Assert
        

        await waitFor(() => {
            expect(usernameField).toHaveClass("form-control is-valid");
            expect(passwordField).toHaveClass("form-control is-valid");
            expect(emailField).toHaveClass("form-control is-valid");
            expect(nameField).toHaveClass("form-control is-valid");
            expect(termsField).toHaveClass("form-check-input");
            
        })
        
    });
})