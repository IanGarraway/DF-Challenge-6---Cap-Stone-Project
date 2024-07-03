import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe } from "vitest";

import ConnectingSpinner from "../../components/sideComponents/ConnectingSpinner.jsx"

describe("Tests of the Connecting Spinner component", () => {
    test("spinner loads", () => {
        //Arrange

        //Act
        render(<ConnectingSpinner />,
            { wrapper: MemoryRouter }
        );


        //Assert
        expect(screen.getByText("Please wait, while we create your account")).toBeInTheDocument();
    });
   
})