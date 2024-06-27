import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, vi } from "vitest";

import axios from "axios";
import GameScreen from "../../pages/GameScreen";

import gameData from "../data/gamedata.json"

vi.mock('axios');

const mockQuerySelector = vi.fn();
document.querySelector = mockQuerySelector;

describe("Tests of GameScreen", () => {
    let mockElement;

    beforeEach(() => {
        mockQuerySelector.mockReset();
        mockElement = {
            style: {
                setProperty: vi.fn()
            }
        };
        mockQuerySelector.mockReturnValue(mockElement);
    })

    it("should say loading if no data is returned", async () => {
        //Arrange

        const mockResponsePayload = { status: 401, message: "Unauthorised" };
            
        axios.get.mockResolvedValue(mockResponsePayload);        

        //Act
        render(<GameScreen />,
             { wrapper: MemoryRouter }
        )

        //Assert
        expect(screen.getByText("Loading")).toBeInTheDocument();

    })

    it("should display data from the gamedata if passed in", async () => {
        //Arrange

        const mockResponsePayload = { status: 200, data: gameData };
            
        axios.get.mockResolvedValue(mockResponsePayload);

        //Act
        render(<GameScreen />,
            { wrapper: MemoryRouter }
        )

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Novatech ShredTech GrindGear")).toBeInTheDocument();
        })
        expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3000/data',
                { withCredentials: true }
            );


    })
    
})