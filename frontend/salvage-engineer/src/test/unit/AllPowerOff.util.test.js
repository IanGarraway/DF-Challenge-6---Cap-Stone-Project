import AllPowerOff from "../../util/AllPowerOff.util.js";

import { describe, expect } from "vitest";

describe("Tests of the all power off utility", () => {
    test("That allpower off returns all false", () => {
        //Arrange
    const mockPowerBox = {
        fabricator: true,
        claw: true,
        magnet: true,
        scoop: true
    }

    //Act
    const result = AllPowerOff(mockPowerBox);

    //Assert

    expect(result.fabricator).to.equal(false);
    expect(result.claw).to.equal(false);
    expect(result.magnet).to.equal(false);
    expect(result.scoop).to.equal(false);
    })
    
})