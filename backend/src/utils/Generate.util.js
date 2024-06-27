import NameGenerator from "./parts/NameGenerator.util.js";
import TypeGenerator from "./parts/TypeGenerator.util.js"


export default class Generate{

    static part = (maxQual, zone) => {

        let newPart = TypeGenerator.getType(maxQual, zone);
        newPart = NameGenerator.getName(newPart);

        return newPart;

        
    }
    
}