import data from "../../../data/gamedata.json" with{type: "json"};
    
export default class GameService{

    static getData() {

        const response = { status: 200, data: data };
        return response;
    }

}