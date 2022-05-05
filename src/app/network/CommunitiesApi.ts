import BaseAPI from "./BaseAPI";
import axios from "axios";

class CommunitiesAPI extends BaseAPI{
    constructor(){
        super()
        this.subpath = "/organizations"
    }

    getCommunities( callback: { (response: any): void; (response: any): void; (arg0: any): void; } ){
        axios({
            method: 'get',
            url: this.BASEURL + this.subpath ,
            params: { per_page:'1000' },
            headers: this.headers
          })
            .then(function (response) {
                    callback(response.data)
            });
    }
}

export default CommunitiesAPI;