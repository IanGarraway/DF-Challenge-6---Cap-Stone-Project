import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect } from "vitest";

import Inventory from "../../components/GameScreen/Inventory.jsx";


describe("Additional tests on the inventory screen", () => {
    it("Should be able to handle an empty array", () => {

        //Arrange

        const mockGameData = {
            partsStorage: [],
            equipment: {
                
            },
            inventory: {
                scrap: null,
                t1Metal: null,
                t2Metal: null,
                t3Metal: null
            }
        }

        const mockFocus = "clawHydrolics";

        const mockGetData = vi.fn();

        //Act
        render(<Inventory gameData={mockGameData} focus={mockFocus} getData={mockGetData} />,
            { wrapper: MemoryRouter }
            
        );

        const foundEmptys = screen.queryAllByText("empty");
        expect(foundEmptys).toHaveLength(2)



        
    })
})