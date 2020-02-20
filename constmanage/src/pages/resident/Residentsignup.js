import React from 'react';
import { Button } from 'react-bootstrap';
import './residentsignup.css';
import {withRouter} from 'react-router-dom'
const url="http://172.16.87.24:2000/";
class Residentsignup extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            number:"",
            voterID:"",
            constituency:"",
            email:"",
            password:""
        }
        this.handleConstituencyChange=this.handleConstituencyChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleNumberChange=this.handleNumberChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleVoterIDChange=this.handleVoterIDChange.bind(this);
        this.signup=this.signup.bind(this);
    }
    handleConstituencyChange(event){
        this.setState({constituency:event.target.value});
    }
    handleNumberChange(event){
        this.setState({number:event.target.value});
    }
    handleVoterIDChange(event){
        this.setState({voterID:event.target.value});
    }
    handleNameChange(event){
        this.setState({name:event.target.value});
    }
    handleEmailChange(event){
        this.setState({email:event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
    signup(){
        let data=JSON.stringify(this.state);
        console.log(data);
        fetch(url+"resident/register",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:data
        }).then((res) => {
            this.props.history.push("/resident/login");
          }).catch((err) => {
            console.log(err)
          })
    }
render(){
    return(<div className="ResidentSignupForm">
        <div>
           <label>Name</label>
           <input type="text" onChange={this.handleNameChange}/>
        </div>
        <div>
           <label>Contact Number</label>
           <input type="text" onChange={this.handleNumberChange}/>
        </div>
        <div>
           <label>VoterID</label>
           <input onChange={this.handleVoterIDChange}/>
        </div>
        <div>
            <label>Constituency</label>
            <input onChange={this.handleConstituencyChange}/>
        </div>
        <div>
           <label>Email</label>
           <input type="email" onChange={this.handleEmailChange}/>
        </div>
        <div>
           <label>Password</label>
           <input type="password" onChange={this.handlePasswordChange}/>
        </div>
        <Button type="primary" onClick={this.signup}>Signup</Button>
       </div>
    );
}
}
export default withRouter(Residentsignup);