import { describe, expect } from "vitest";

import CalculatePower from "../../util/calculatePower.util.js";

describe("Tests of the CalculatePower utility", () => {
    test("that is will return 4", () => {
        //arrange
        const mockPowerBox = {
            fabricator: true,
            claw: true,
            magnet: true,
            scoop: true
        }

        //Act
        const result = CalculatePower(mockPowerBox);

        //Assert
        expect(result).to.equal(4);
    });

    test("that is will return 4", () => {
        //arrange
        const mockPowerBox = {
            fabricator: false,
            claw: false,
            magnet: false,
            scoop: false
        }

        //Act
        const result = CalculatePower(mockPowerBox);

        //Assert
        expect(result).to.equal(0);
    })
})