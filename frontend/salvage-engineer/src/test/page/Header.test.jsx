import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";

import axios from "axios";
import Header from "../../components/Header.jsx";

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';



vi.mock('axios');
vi.mock('react-cookie', () => ({
  useCookies: vi.fn(),
}));
vi.mock('react-router-dom', async() => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };  
});

describe("Tests of Header", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = vi.fn();
        useCookies.mockImplementation(() => [{ user: 'userData' }, vi.fn()]);
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('renders header and navigates on link click', async () => {
        //Arrange
        const mockUser = { username: 'testUser', admin: true };
        const mockSetUser = vi.fn();
        

        const mockResponsePayload = { status: 200, data: { message: 'Account logged out' } };

        axios.post.mockResolvedValue(mockResponsePayload);

        //Act
        render(
            
            <Header user={mockUser} setUser={mockSetUser} />,
             { wrapper: MemoryRouter }
            
        );

        //Assert

        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/Account Management/i)).toBeInTheDocument();
        expect(screen.getByText(/Admin Controls/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout testUser/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Logout testUser/i));
        
        
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
        await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(''));    
        
        await expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/auth/logout',
                { "message" : "Logout"  },
                { withCredentials: true }
            )
    })


});