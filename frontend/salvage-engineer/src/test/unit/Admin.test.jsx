import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe } from "vitest";

import Admin from "../../pages/Admin.jsx";

import axios from "axios";

vi.mock('axios');

describe("Tests of the Admin Screen not covered by adminTable", () => {

    beforeEach(() => {        
        axios.get.mockReset()

        const mockResponsePayload = { status: 200, data: {message: "power changed"} };
            
            axios.get.mockResolvedValue(mockResponsePayload);
    })

    test("That it will render", () => {
        //arrange

        //act
        render(<Admin />,
            { wrapper: MemoryRouter }
        )

        //Assert
    })
})