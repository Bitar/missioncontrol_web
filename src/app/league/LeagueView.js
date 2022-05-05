// import React, { useState  } from 'react';
// import MCSideBar from "../Components/Sidebar"
// import { useParams } from "react-router-dom";
// import LeaguesApi from "../../../network/leaguesApi";
// import Matches from '../Matches/Matches';
// import Users from '../Users/Users';
// import Registered from '../Registered/Registered';
// import Games from '../Games/Games';




// export function withRouter(Children){
//     return(props)=>{
//        const params  = {params: useParams()};
//        const [league, setLeague] = useState({});
//        const [matches ,setMatches] = useState({});
//        const [users, setUsers] = useState({});
//        const [scores,setScores] = useState({});
//        const [register,setRegister] = useState({});
//        const [games, setGames] = useState({})

//        return <Children {...props}  params = {params.params} league={league} setLeague={setLeague} matches={matches} setMatches={setMatches} users={users} setUsers={setUsers} scores={scores} setScores={setScores} register={register} setRegister={setRegister} games={games} setGames={setGames}/>
       
//    }
//  }

// class LeagueView extends React.Component{
//     constructor(props){
//         super(props)
//         this.api = new LeaguesApi()
//         this.state = {league:{}, index : 0 , id:-1}
//         this.onSideBarItemClick = this.onSideBarItemClick.bind(this)
//     }

//     onSideBarItemClick(index){
//         console.log(index)
//         this.setState({index:index})
//     }
//     componentDidMount(){
//         const id = this.props.params.id
//         this.setState({id:id})
//         this.api.getLeague(id ,  (response) => {
//                 if(response !== null){
//                     this.setState({league:response.data})
//                 }
//             }
//         )
        
//     }

  
  

//     userContent (){
//         if(this.state.id !== -1){
//             return <Users id={this.state.id}/>
//         }else{
//             return <div>No Matches Found</div>
//         }

//     }
//     matchContent(){
//         if(this.state.id !== -1){
//             return <Matches id={this.state.id} />
//         }else{
//             return <div>No Matches Found</div>
//         }
        
//     }

//     // scoreContent(){
//     //     if(this.state.id !== -1){
//     //         return <Scores id={this.state.id} />
//     //     }else{
//     //         return <div>No Scores Found</div>
//     //     }

//     // }
//     registerContent(){
//         if(this.state.id !== -1){
//             return <Registered id={this.state.id} />
//         }else{
//             return <div>No Scores Found</div>
//         }

//     }

//     leagueContent(){
//         if(this.state.id !== -1){
//             return <div>Go back to previous Leagues</div>
//         }else{
//             return <div>No Scores Found</div>
//         }

//     }

//     gameContent(){
//         if(this.state.id !== -1){
//             return <Games id={this.state.id} />
//         }else{
//             return <div>No Matches Found</div>
//         }
        
//     }

//     // dashContent(){
//     //     if(this.state.id !== -1){
//     //         return <DashBoard id={this.state.id} />
//     //     }else{
//     //         return <div>No Matches Found</div>
//     //     }
        
//     // }

//     TBD(){
//         return(

//             <div>This will be Announcements</div>
//         )
//     }

  
//     content(league){
//        switch(this.state.index){
//             case 0:
//                 return this.matchContent()
//             case 1:
//                 return this.userContent()
//             case 2:
//                 return this.registerContent()
//             case 3:
//                 return this.gameContent()
//             default:
//                 return this.TBD()
            
//        }
       
       
//     }

//     render(){
//         return(
//                 <div className="flex">
//                     <MCSideBar values={["Matches","Users","Registered","Games",]}  onItemClick={(index) => this.onSideBarItemClick(index)} />        
//                     <div className="w-full h-full p-4 m-8 overflow-y-auto">
//                        {this.content(this.state.league)}
//                     </div>
//                 </div>
//         )
//     }

// }


// export default withRouter(LeagueView) ;