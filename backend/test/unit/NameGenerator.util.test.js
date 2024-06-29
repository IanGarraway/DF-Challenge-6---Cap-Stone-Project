import { expect } from "chai";
import sinon from "sinon";
import GetRandom from "../../src/utils/GetRandom.util.js";
import NameGenerator from "../../src/utils/parts/NameGenerator.util.js";
import brandNames from "../../src/data/BrandNames.data.json" assert { type: "json" }
import rangeNames from "../../src/data/ProductNames.data.json" assert { type: "json" }

describe("NameGenerator", () => {
    describe("getName", () => {
        let getRandomStub;

        beforeEach(() => {
            getRandomStub = sinon.stub(GetRandom, "int");
        });

        afterEach(() => {
            getRandomStub.restore();
        });

        it("should set attributes correctly for Ubermech", () => {
            getRandomStub.returns(99); // CompNum 99 triggers Ubermech
            const part = {
                type: "sensor",
                gathVol: 0
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Ubermech");
            expect(result.mlogo).to.equal("ubermechLogo.png");
            // Add more assertions based on what you expect NameGenerator to do
        });
        it("should set attributes correctly for Salvage Works edge", () => {
            getRandomStub.returns(98); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathSpd: 0
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Salvage Works");
            expect(result.mlogo).to.equal("SalvageWorksLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });
        it("should set attributes correctly for Salvage Works edge lower", () => {
            getRandomStub.returns(80); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathSpd: 1
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Salvage Works");
            expect(result.mlogo).to.equal("SalvageWorksLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });

        it("should set attributes correctly for Heavy Worlds upper edge", () => {
            getRandomStub.returns(79); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathSpd: 0
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Heavy World");
            expect(result.mlogo).to.equal("heavyWorldLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });
        it("should set attributes correctly for Heavy Worlds  ", () => {
            getRandomStub.returns(70); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathVol: 1
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Heavy World");
            expect(result.mlogo).to.equal("heavyWorldLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });
        it("should set attributes correctly for Heavy Worlds lower bounds ", () => {
            getRandomStub.returns(50); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathSpd: 0
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("Heavy World");
            expect(result.mlogo).to.equal("heavyWorldLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });
        it("should set attributes correctly for Heavy Worlds lower bounds ", () => {
            getRandomStub.returns(49); // CompNum between 50-80 triggers Heavy Worlds (example)
            const part = {
                type: "sensor",
                gathSpd: 0
                // Add other necessary attributes for your test case
            };

            const result = NameGenerator.getName(part);

            expect(result.manufacturer).to.equal("SalvageTech");
            expect(result.mlogo).to.equal("salvageTechLogo.png");
            // Add more assertions for Heavy Worlds scenario
        });



        // Add more test cases to cover other scenarios like SalvageTech, Salvage Works, etc.
    });
});
