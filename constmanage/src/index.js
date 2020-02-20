import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Residentlogin from './pages/resident/Residentlogin';
import Residentsignup from './pages/resident/Residentsignup';
import Residenthome from './pages/resident/Residenthome';
import SubmitProblem from './pages/resident/SubmitProblem';
import ResidentViewProblems from './pages/resident/ResidentViewProblems';
import CMsignup from './pages/signup/CMsignup';
import MPsignup from './pages/signup/MPsignup';
import CMlogin from './pages/login/CMlogin';
import MPlogin from './pages/login/MPlogin';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Router>
      <Route exact path = "/" component = {App}/>
      <Route exact path = "/signup" component = {Signup} />
      <Route exact path = "/signup/cm" component = {CMsignup} />
      <Route exact path = "/signup/mp" component = {MPsignup} />
      <Route exact path = "/resident/signup" component = {Residentsignup} />
      <Route exact path = "/resident/login" component = {Residentlogin} />
      <Route path="/resident/user/:userid" component={Residenthome}/>
      <Route path="/resident/submitproblem/:userid" component={SubmitProblem}/>
      <Route path="/resident/viewproblems/:userid" component={ResidentViewProblems}/>
      <Route exact path = "/login" component = {Login} />
      <Route exact path = "/login/cm" component = {CMlogin} />
      <Route exact path = "/login/mp" component = {MPlogin} />

   </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
