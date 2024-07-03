import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe } from "vitest";

import ErrorBox from "../../components/sideComponents/ErrorBox.jsx"

describe("Tests of the Connecting Spinner component", () => {
    test("spinner loads", () => {
        //Arrange

        //Act
        render(<ErrorBox />,
            { wrapper: MemoryRouter }
        );


        //Assert
        expect(screen.getByText("Something has gone wrong!")).toBeInTheDocument();
    });
   
})