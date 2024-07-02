import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe } from "vitest";

import Storage from "../../components/GameScreen/Storage.jsx";


describe("Additional tests on the Storage jsx component", () => {
    it("should be able to handle bad data being passed in", () => {
        //arrange

        const mockInv = {
            scrap: null,
            t1Metal: null,
            t2Metal: null,
            t3Metal: null
        }

        //act

        render(<Storage inv={mockInv}/>,
            { wrapper: MemoryRouter  }
        );

        expect(screen.getByText("Scrap: 0.00")).toBeInTheDocument();
        expect(screen.getByText("Tier 1 Metals: 0.00")).toBeInTheDocument();
        expect(screen.getByText("Tier 2 Metals: 0.00")).toBeInTheDocument();
        expect(screen.getByText("Tier 3 Metals: 0.00")).toBeInTheDocument();
    })

    it("should be able to handle bad data being passed in", () => {
        //arrange

        const mockInv = {
            scrap: 500.279,
            t1Metal: 300.34,
            t2Metal: 1.0723,
            t3Metal: 12.675
        }

        //act

        render(<Storage inv={mockInv}/>,
            { wrapper: MemoryRouter  }
        );

        expect(screen.getByText("Scrap: 500.28")).toBeInTheDocument();
        expect(screen.getByText("Tier 1 Metals: 300.34")).toBeInTheDocument();
        expect(screen.getByText("Tier 2 Metals: 1.07")).toBeInTheDocument();
        expect(screen.getByText("Tier 3 Metals: 12.68")).toBeInTheDocument();
    })

})