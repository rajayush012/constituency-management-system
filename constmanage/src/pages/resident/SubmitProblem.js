import React from 'react';
import { Button } from 'react-bootstrap';
import './residentsignup.css';
import {withRouter} from 'react-router-dom'
import ResidentNavbar from './ResidentNavbar';
const url="http://172.16.87.24:2000/";
class Residentsignup extends React.Component{
    constructor(){
        super();
        this.state={
            title:"",
            description:"",
            constituency:"",
        }
        this.handleConstituencyChange=this.handleConstituencyChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.signup=this.signup.bind(this);
    }
    handleConstituencyChange(event){
        this.setState({constituency:event.target.value});
    }
    handleDescriptionChange(event){
        this.setState({description:event.target.value});
    }
    handleTitleChange(event){
        this.setState({title:event.target.value});
    }
    signup(){
        let data=JSON.stringify(this.state);
        console.log(data);
        fetch(url+"resident/submitproblem/"+this.props.match.params.userid,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:data
        }).then((res) => {
           return res.json();
          }).then(res=>console.log(res)).catch((err) => {
            console.log(err)
          })
    }
render(){
    return(<div className="ResidentSignupForm">
        <ResidentNavbar userid={this.props.match.params.userid}/>
        <div>
           <label>Problem Title</label>
           <input type="text" onChange={this.handleTitleChange}/>
        </div>
        <div>
           <label>Problem Description</label>
           <input type="text" onChange={this.handleDescriptionChange}/>
        </div>
        <div>
            <label>Constituency</label>
            <input onChange={this.handleConstituencyChange}/>
        </div>
        <Button type="primary" onClick={this.signup}>Signup</Button>
       </div>
    );
}
}
export default withRouter(Residentsignup);