import { expect } from "chai";
import sinon from "sinon";
import Generate from "../../src/utils/Generate.util.js";

describe("Tests of the generate utility", () => {
    let randomMock;

    beforeEach(() => {
        randomMock = sinon.stub(Math, 'random');
    })

    afterEach(() => {
        randomMock.restore();
    })

    it('should return a UberMech Sensor part, with maxQual of 4', () => {
        //Arrange
        randomMock.onCall(0).returns(0.55);  //select sensor part
        randomMock.onCall(1).returns(0.666667); //set the values
        randomMock.onCall(2).returns(0.333334);
        randomMock.onCall(3).returns(0.9999);//select ubermech
        randomMock.onCall(4).returns(0.666667) 
        randomMock.onCall(5).returns(0.666667) 


        //Act

        const part = Generate.part(1, 1);        

        //Assert
        expect(part.manufactuer).to.equal("Ubermech")
        expect(part.type).to.equal("sensor");
        expect(part.maxQual).to.equal(4);
    })
})