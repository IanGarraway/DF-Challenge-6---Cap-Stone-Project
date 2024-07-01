

export default class InventoryFocus{

    static onType(parts, type) {
        let newList = [];
        for (let i = 0; i < parts.length; i++){
            if (parts[i].type === type) {
                newList.push(parts[i]);
            }
        }
        return newList;
    }
}