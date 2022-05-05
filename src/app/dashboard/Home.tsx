import { Component } from "react";
import Communities from "../communities/Communities";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import Leagues from '../league/Leagues'

type Props = {
    onTap?:(id: any) => void;
    id?: string;
};
type State = {
    selection: string;
  };
export default class Home extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state ={
            selection: ''
        }
    }

    setSelection(comm: { id: any; }){
      this.setState({selection:comm.id})
    }

    render(){
       return(
        <div>
       <MasterLayout>
        <Communities onTap={(comm: { id: any; }) => this.setSelection(comm)} />
        <Leagues id={this.state.selection} leagues={undefined} isLoading={false} />
        </MasterLayout>
        </div>

       )
        
    }

}

