import React from "react";
import { Component } from "react";
import LoginApi from "../network/LoginApi"


type Props = {
    onLogin:(id: any) => void;
};
type State ={
    username:string,
    password:string,
    isLoggedin:boolean,
}

export default class Login extends Component<Props,State>{
    api: LoginApi;

   
    constructor(props:Props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username : '',
            password : '' , 
            isLoggedin:false
        }
        
        this.api = new LoginApi()
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        if(token !== null){

            this.setState({isLoggedin:true})
        }
    }

    

     handleChange(event: { target: { getAttribute: (arg0: string) => any; value: any; }; }) {   
        switch(event.target.getAttribute('name')){
            case 'username': 
                this.setState({username: event.target.value});
            break;
            case 'password': 
                this.setState({password: event.target.value});
            break;
            default:
                break;
            
        }

    }
    handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        this.api.login( this.state.username, this.state.password , (response: { data: { token: any; }; })=>{
            
            if(response.data !== null && response.data.token ){
                    console.log(response.data.token)
                    // storing input name
                    localStorage.setItem("token",JSON.stringify(response.data.token));
                    this.props.onLogin(true)
            }
        } )

    }

    showLoginForm(){
        return <form className="form w-100"> 
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Mission Control Sign In</h1>
          </div>
          <div className="fv-row mb-10">
              <label className="form-label fs-6 fw-bolder text-dark" htmlFor="username">Username</label>
                
              <input className="form-control form-control-lg form-control-solid"name="username"  onChange={this.handleChange} value={this.state.username}  id="username" type="text" placeholder="Username" />
              </div>
                      
              <div className="fv-row mb-10">
                <div className="d-flex flex-stack mb-2">
                    <label className="form-label fs-6 fw-bolder text-dark" htmlFor="password">Password</label>
                    </div>      
                    <input name="password" onChange={this.handleChange} value={this.state.password} className="form-control form-control-lg form-control-solid" id="password" type="password" placeholder="Password"/>
                  </div>

                  <div className="fv-row mb-10">
                  <label className="form-check form-check-custom form-check-solid">
                <input className="form-check-input" type="checkbox" name="remember"/>
                <span className="form-check-label fw-bold text-gray-700 fs-6">Remember Me
            </span>
            </label>
        </div>
        <div className="text-center">
              <button onClick={this.handleSubmit} className="btn btn-lg btn-primary w-100 mb-5" type="button">
                Sign In                      
              </button>
          </div>
                            
                   
                    
   </form>            
    }
    render(){
           return  this.showLoginForm()
    }

}

