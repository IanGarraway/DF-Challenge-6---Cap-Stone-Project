

export default class Calc{

    static scrappage(part) {
        part = part.toObject();
        
        let total = 1;

        const options = ["name", "type", "manufacturer", "mlogo"];
        const partKeys = Object.keys(part);        

        for (let key of partKeys) {
            if (!options.includes(key)) {                
                total += part[key];
            }
        }

        return total / 10;

    }
}