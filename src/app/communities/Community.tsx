import React from 'react'
import { Component } from "react";


interface ICommunityProps{
    name?:string,
    description?:string,
    comm?: any,
}

class Community extends Component<ICommunityProps>{

    createCard(){
        return(
            <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{this.props.comm.name}</h5>
                  <p className="card-text">{this.props.comm.description}</p>
                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
              </div>
            </div>
            </div>
            
        ) 
    }

    

    render(){
        return this.createCard()
    }
    
}

export default Community;