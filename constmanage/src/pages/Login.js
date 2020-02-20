import React from 'react';
import {Link} from "react-router-dom";

class Login extends React.Component{
render(){
    return (
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/login/cm">Login as a CM</Link>
            </li>
            <li>
              <Link to="/login/mp">Login as a MP/MLA</Link>
            </li>
            <li>
              <Link to="/resident/login">Login as a Resident</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}
}
export default Login;