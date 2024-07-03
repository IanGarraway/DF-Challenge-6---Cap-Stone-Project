

export default class Find{

    static index(items, item) {
        const itemKeys = Object.keys(item);        

        outerloop: for (let i = 0; i < items.length; i++){
            for (let key of itemKeys) {
                if (items[i][key] != item[key]) { continue outerloop; }                 
            };            
            return i;            
        }
        return -1;       
    }
}