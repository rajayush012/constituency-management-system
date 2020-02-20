import React from 'react';
import { Button } from 'react-bootstrap';
import './residentsignup.css';
import {withRouter} from 'react-router-dom'
const url="http://172.16.87.24:2000/";
class Residentlogin extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.login=this.login.bind(this);
    }
    handleEmailChange(event){
        this.setState({email:event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
    login(){
        let data=JSON.stringify(this.state);
        console.log(data);
        fetch(url+"resident/login",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:data
        }).then((res) => {
            if(res.status!==200){throw new Error("User Not Found");}
            else{return res.json( )}
          }).then((res)=>{
              this.props.history.push("/resident/user/"+res._id);
          }).catch((err) => {
            alert(err); 
          })
    }
render(){
    return(<div className="ResidentLoginForm">
        <div>
           <label>Email</label>
           <input type="email" onChange={this.handleEmailChange}/>
        </div>
        <div>
           <label>Password</label>
           <input type="password" onChange={this.handlePasswordChange}/>
        </div>
        <Button type="primary" onClick={this.login}>Login</Button>
       </div>
    );
}
}
export default withRouter(Residentlogin);