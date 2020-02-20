import React from 'react';
import './residentsignup.css';
import {withRouter} from 'react-router-dom'
import ResidentNavbar from './ResidentNavbar';
import {Table} from 'react-bootstrap';
const url="http://172.16.87.24:2000/";
class ResidentViewProblems extends React.Component{
    constructor(){
        super();
        this.state={
            problems:[]
        }
    }
   componentDidMount(){
        fetch(url+"resident/viewproblems/"+this.props.match.params.userid).then((res) => {
           return res.json();
          }).then(res=>{
              console.log(res);this.setState({problems:res}
            )}).catch((err) => {
            console.log(err)
          })
        }
render(){
    return(<div className="ResidentSignupForm">
        <ResidentNavbar userid={this.props.match.params.userid}/>
        <div>
          <Table bordered hover striped>
              <thead>

              </thead>
              <tbody>
                  {this.state.problems.map((problem,index)=>{
                      return <tr key={"Problem"+index}>
                          <td>{"NAME"}</td>
                      </tr>
                  })}
              </tbody>
          </Table>
       </div>
       </div>
    );
}
}
export default withRouter(ResidentViewProblems);