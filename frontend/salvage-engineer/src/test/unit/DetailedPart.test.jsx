import { findAllByTestId, findByTestId, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { describe } from "vitest";
import DetailedPart from "../../components/GameScreen/DetailedPart";

describe("Tests of the DetailedPart component", () => {
    
    it("should display loading if no part is passed in", () => {
        //arrange

        //act
        render(<DetailedPart part={null} />,
            { wrapper: MemoryRouter }
    
        );

        //assert

        expect(screen.getByText("loading...")).toBeInTheDocument();
        
    })

    it("should display all the stats passed in", () => {
        //arrange

        const mockPart = {
            name: "Mock Part",
            Manufacturer: "MockMaker",
            mlogo: "fake.png",
            type: "unipart",
            grindSpeed: "0",
            grindStr: "1",
            grindVol: "2",
            smeltSpd: "3",
            smeltTier: "4",
            maxQual: "5",
            findTime: "6",
            speed: "7",
            gathVol: "8",
            gathSpd: "9"
        };

        //act
        render(<DetailedPart part={mockPart} />,
            { wrapper: MemoryRouter }
    
        );

        //assert

        expect(screen.getByText("Grind Speed: 0")).toBeInTheDocument();
        expect(screen.getByText("Grind Strength: 1")).toBeInTheDocument();
        expect(screen.getByText("Grind Volume: 2")).toBeInTheDocument();
        expect(screen.getByText("Smelt Speed: 3")).toBeInTheDocument();
        expect(screen.getByText("Smelt Tier: 4")).toBeInTheDocument();
        expect(screen.getByText("Maximum Quality: 5")).toBeInTheDocument();
        expect(screen.getByText("Part Location speed: 6")).toBeInTheDocument();
        expect(screen.getByText("Speed: 7")).toBeInTheDocument();
        expect(screen.getByText("Gather Volume: 8")).toBeInTheDocument();
        expect(screen.getByText("Gather Speed: 9")).toBeInTheDocument();
        
    })
    it("should display less if the part is missing stats", () => {
        //arrange

        const mockPart = {
            name: "Mock Part",
            Manufacturer: "MockMaker",
            mlogo: "fake.png",
            type: "unipart",
           
        };

        //act
        render(<DetailedPart part={mockPart} />,
            { wrapper: MemoryRouter }
    
        );

        //assert

        expect(screen.queryByText("Grind Speed: 0")).not.toBeInTheDocument();
        expect(screen.queryByText("Grind Strength: 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Grind Volume: 2")).not.toBeInTheDocument();
        expect(screen.queryByText("Smelt Speed: 3")).not.toBeInTheDocument();
        expect(screen.queryByText("Smelt Tier: 4")).not.toBeInTheDocument();
        expect(screen.queryByText("Maximum Quality: 5")).not.toBeInTheDocument();
        expect(screen.queryByText("Part Location speed: 6")).not.toBeInTheDocument();
        expect(screen.queryByText("Speed: 7")).not.toBeInTheDocument();
        expect(screen.queryByText("Gather Volume: 8")).not.toBeInTheDocument();
        expect(screen.queryByText("Gather Speed: 9")).not.toBeInTheDocument();
        
    })
})