import React from 'react';
import {withRouter} from 'react-router-dom';
import ResidentNavbar from './ResidentNavbar';
const url="http://172.16.87.24:2000/";
class Residenthome extends React.Component{
    state={resident:{}};
    componentDidMount(){
        fetch(url+"resident/user/"+this.props.match.params.userid).then(res=>res.json()).then((res)=>{
            console.log(res);
            this.setState({resident:res});
        }).catch(err=>console.log(err));
    }
render(){
    return(<div className="ResidentLoginForm">
       <ResidentNavbar userid={this.props.match.params.userid}/>
        <div>
            <label>Name</label>
            <span>{this.state.resident.name}</span>
        </div>
        <div>
            <label>Voter ID</label>
            <span>{this.state.resident.voterID}</span>
        </div>
        <div>
            <label>Phone Number</label>
            <span>{this.state.resident.number}</span>
        </div>
        <div>
            <label>Email</label>
            <span>{this.state.resident.email}</span>
        </div>
       </div>
    );
}
}
export default withRouter(Residenthome);