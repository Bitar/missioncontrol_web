import  { Component, } from "react";
import LeaguesApi from "../network/LeaguesApi";
import LeagueCard from "./LeagueCard";
import { Link } from "react-router-dom";
// import { LoadingSpinner } from "../Components/LoadingSpinner";

type Props = {
    leagues:any;
    id:any;
    isLoading:boolean;
      
  
  }
  type State = {
      id:any;
      leagues:any;
      isLoading:boolean;
  }

class Leagues extends Component <Props , State> {
    api: any;

    constructor(props:Props) {
        super(props);
        this.state = {leagues: [] , id:props.id , isLoading:false};
        this.api =  new LeaguesApi()
      }
    
    
    componentDidUpdate(prevProps: { id: any; }, prevState: any) {
        if (this.props.id !== prevProps.id) {
            if(this.props.id.length !== 0){
                this.setState({isLoading:true})
                this.api.getLeagues( this.props.id, (response: { data: any; } ) => {
                    this.setState({isLoading:false})
                    console.log(response)
                    this.setState({ leagues: response.data  });
                })
            }
        }
     }
     
    componentDidMount(){
        
        
    }

    // const CardArray: Function = (props: Items): JSX.Element[] => {
    //     return props.items.map((item) => <Item data={item} />);
    // };
    
    createCards: Function = ( array: any[] ) :JSX.Element[] => {
        return array.map( (x,index) => 
           <Link  to={"/league/"+x.id} > <LeagueCard  key={index} league={x} /> </Link> 
        )
            
    }

    
    render() {
      
        var content = <div></div>
        
        switch(this.state.isLoading){
            case true:
                content = <div>Loading</div>
                break;
                case false:
                    content = this.createCards(this.state.leagues)
                break;
                default:
                    content = this.createCards(this.state.leagues)
                    break;
        }

      return <div className="card">{ content }</div> 
    }
}

export default Leagues