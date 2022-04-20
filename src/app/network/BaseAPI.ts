
export default class BaseAPI{    
    BASEURL:string
    subpath:string
    headers:{ Authorization: string }
    token:any
       

    getToken(){
        return localStorage.getItem('token')
    }

    constructor(){
        this.BASEURL = "https://staging.missioncontrol.gg/api/v1"   
        this.subpath = ""
        this.token = this.getToken()
        this.headers =  {
            'Authorization': "Bearer " + JSON.parse(this.token)
          }  
    };

}




