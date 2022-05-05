import { Component } from "react";
import CommunitiesAPI from "../network/CommunitiesApi";
import Community from "./Community";

type Props = {
    onTap:(id: any) => void;
};
type State ={
    comms: []
}

export default class Communities extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {
            comms:[]
        }
    }

    componentDidMount(){
      const api =   new CommunitiesAPI ()
      api.getCommunities((response: { data: any; }) => {
          console.log(response.data)
        this.setState({ comms: response.data  });
      })
    }

    renderCommunities(communities: any[]){
        return communities.map((com: any , index: any) => {
                return <div className="" onClick={() => this.props.onTap(com)} ><Community  key={index} comm={com} /></div>
        })
    }

    render(){
     
        return this.renderCommunities(this.state.comms)
    }
}

