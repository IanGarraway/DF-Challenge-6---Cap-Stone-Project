

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

    static totalPower(power) {
        let totalPowerUsage = 0;
        if (power.fabricator) totalPowerUsage++;
        if (power.claw) totalPowerUsage++;
        if (power.magnet) totalPowerUsage++;
        if (power.scoop) totalPowerUsage++;
        
        return totalPowerUsage;        
    }
}