import BaseAPI from "./BaseAPI";
import axios from "axios";

export default class LeaguesApi extends BaseAPI{
    include: string;

    constructor(){
        super()
        this.subpath = "/leagues"
        this.include = 'game,card,mode,season,announcements,leaderboard'
    }

    getLeagues( orgID: any ,  callback: { (response: any): void; (arg0: any): void; } ){
        axios({
            method: 'get',
            url: this.BASEURL + this.subpath ,
            params: { 'filter[organization]':orgID , include:this.include , per_page:'1000' },
            headers: this.headers
          })
            .then(function (response) {
                    callback(response.data)
            });
    }

    getLeague(leagueID: string , callback: { (response: any): void; (arg0: any): void; }){

        axios({
            method: 'get',
            url: this.BASEURL + this.subpath + "/" + leagueID ,
            params: {  },
            headers: this.headers
          })
            .then(function (response) {
                    callback(response.data)
            });
    }

}

