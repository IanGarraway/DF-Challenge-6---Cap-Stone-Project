import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe } from "vitest";

import App from "../../App"

describe("Program test", () => {
    test("it can run and not crash", () => {
        //arrange

        //Act
        render(<App />,
            { wrapper: MemoryRouter }
        )

        //Assert
        expect(screen.getByTestId("loginUsername")).toBeInTheDocument();
    })
})