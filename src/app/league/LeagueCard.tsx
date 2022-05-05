import React from "react";
import { Component } from "react";
type Props = {
  league:any

    

}
type State = {
    
}


class LeagueCard extends Component<Props , State>{
    league: any;
    constructor(props:Props){
        super(props)
        this.league = props.league

    }
    render(){
        return(
            <div>
           <div className="w-60 rounded shadow-lg m-2">
           <img className="w-full h-60" src={this.league.game.igdb.cover_url.replace('t_thumb','t_720p')} alt="img" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{this.props.league.name}</div>
                <p className="text-gray-700 text-base">
                    {this.props.league.description}
                </p>
            </div>
            </div>
            </div>
        )
    }

}

export default LeagueCard