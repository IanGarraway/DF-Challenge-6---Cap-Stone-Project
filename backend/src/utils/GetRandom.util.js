
export default class GetRandom {

    static int(max) {
                
        return Math.floor(Math.random() * max);
    }

    static element = (array) => {
        
        return array[Math.floor(Math.random() * array.length)];
    }
}