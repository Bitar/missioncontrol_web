import React from "react";
import { Component } from "react";
import LoginApi from "../network/LoginApi"
// import {Login} from "./Login"


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
        return <div className="bg-indigo-700 flex justify-center items-center h-screen">
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input name="username"  onChange={this.handleChange} value={this.state.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input name="password" onChange={this.handleChange} value={this.state.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>
                            <div className="flex items-center justify-between">
                            <button onClick={this.handleSubmit} className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" type="button">
                                Sign In
                            </button>
                            </div>
                            
                        </form>
                        <p className="text-center text-gray-50 text-xs">
                            &copy;2022 Mission Control GG. All rights reserved.
                        </p>
                    </div>
                </div>
    }
    render(){
           return  this.showLoginForm()
    }

}

