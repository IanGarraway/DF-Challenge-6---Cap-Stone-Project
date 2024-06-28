import GetRandom from "../GetRandom.util.js"
import brandNames from "../../data/BrandNames.data.json" assert { type: "json" }
import rangeNames from "../../data/ProductNames.data.json" assert { type: "json" }


export default class NameGenerator{

    static getName = (part) => {
        
        const compNum = GetRandom.int(100);
        

        if (compNum >= 99) { part = this.#ubermech(part); }
        else if (compNum >= 80) { part = this.#salvageWorks(part); }
        else if (compNum >= 50) { part = this.#heavyWorlds(part); }
        else{part = this.#salvagetech(part);}          

        return part;
        
    }


    static #heavyWorlds = (part) => {
        
        part.mlogo = "heavyWorldLogo.png";
        part.manufacturer = "Heavy World";
        if (part.gathVol > 0) { part.gathVol++; }
        const brand = GetRandom.element(brandNames["HeavyWorlds"]);
        const product = GetRandom.element(rangeNames[part.type]);
        part.name = `${brand} ${product}`;
        return part;
    
    }

    static #salvagetech = (part) => {
        
        part.mlogo = "salvageTechLogo.png";
        part.manufacturer = "SalvageTech";        
        const brand = GetRandom.element(brandNames["SalvageTech"]);
        const product = GetRandom.element(rangeNames[part.type]);
        part.name = `${brand} ${product}`;
        return part;
    
    }
    static #salvageWorks = (part) => {
        
        part.mlogo = "SalvageWorksLogo.png";
        part.manufacturer = "Salvage Works";
        if (part.gathSpd > 0) { part.gathSpd++; }
        const brand = GetRandom.element(brandNames["SalvageWorks"]);
        const product = GetRandom.element(rangeNames[part.type]);
        part.name = `${brand} ${product}`;
        return part;
    
    }
    static #ubermech = (part) => {
        
        part.mlogo = "ubermechLogo.png";
        part.manufacturer = "Ubermech";        
        if (part.maxQual > 0) { part.maxQual++; }
        const brand = GetRandom.element(brandNames["UberMech"]);
        const product = GetRandom.element(rangeNames[part.type]);
        part.name = `${brand} ${product}`;

        return part;
    
    }
    


    
}