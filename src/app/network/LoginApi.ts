import BaseAPI from "./BaseAPI";
import axios from "axios";

export default class LoginApi extends BaseAPI{
    constructor(){
        super()
        this.headers = {Authorization: "" }
        this.subpath = "/auth"
    }

    login( email: string , pass: string, callback: { (response: any): void; (arg0: any): void; } ){
        axios({
            method: 'post',
            url: this.BASEURL + this.subpath + '/login' ,
            params: {email:email , password : pass},
           
          })
          .then(function (response) {
                callback(response.data)
            }).catch((err)=>{
                callback(err)
            })
    }

}
