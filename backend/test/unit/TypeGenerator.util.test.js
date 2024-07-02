import { expect } from "chai";
import sinon from "sinon";
import GetRandom from "../../src/utils/GetRandom.util.js";
import TypeGenerator from "../../src/utils/parts/TypeGenerator.util.js";

describe("TypeGenerator", () => {
    describe("getType", () => {
        let getRandomStub;

        beforeEach(() => {
            getRandomStub = sinon.stub(GetRandom, "int");
        });

        afterEach(() => {
            getRandomStub.restore();
        });

        it("should generate a magnetMotor part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(0);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("magnetMotor");
            expect(result.gathSpd).to.equal(1);
            expect(result.gathVol).to.equal(2);
            // Add more assertions specific to magnetMotor part generation
        });

        it("should generate a magnetCore part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(1);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("magnetCore");            
            expect(result.gathVol).to.equal(3);            
        });

        it("should generate a clawHydrolics part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(2);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("clawHydrolics");            
            expect(result.gathSpd).to.equal(1);            
            expect(result.gathVol).to.equal(2);            
        });

        it("should generate a clawScanner part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(3);
            getRandomStub.onCall(1).returns(1);
            

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("clawScanner");            
            expect(result.maxQual).to.equal(1);            
                        
        });
        it("should generate a scoopMotor part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(4);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("scoopMotor");            
            expect(result.speed).to.equal(1);            
            expect(result.gathVol).to.equal(2);            
        });
        it("should generate a scoopSensor part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(5);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("scoopSensor");            
            expect(result.gathSpd).to.equal(1);            
            expect(result.gathVol).to.equal(2);            
        });
        it("should generate a sensor part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(6);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("sensor");            
            expect(result.maxQual).to.equal(1);
            expect(result.findTime).to.equal(2);
            
        });

        it("should generate a grinderMotor part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(7);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("grinderMotor");            
            expect(result.grindSpeed).to.equal(1);            
            expect(result.grindStr).to.equal(2);            
        });

        it("should generate a grindergear part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(8);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("grinderGear");            
            expect(result.grindSpeed).to.equal(1);            
            expect(result.grindVol).to.equal(2);            
        });
        it("should generate a smelterHeater part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(9);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("smelterHeater");            
            expect(result.smeltSpd).to.equal(1);            
            expect(result.smeltTier).to.equal(3);            
        });

        it("should generate a smelterControl part", () => {
            //Arrange
            getRandomStub.onCall(0).returns(10);
            getRandomStub.onCall(1).returns(1);
            getRandomStub.onCall(2).returns(2);

            //Act

            const result = TypeGenerator.getType(2, 1);

            //Assert
            expect(result.type).to.equal("smelterControl");            
            expect(result.smeltSpd).to.equal(1);            
            expect(result.smeltTier).to.equal(3);            
        });




        // Add more test cases to cover other part types and edge cases
    });
});
