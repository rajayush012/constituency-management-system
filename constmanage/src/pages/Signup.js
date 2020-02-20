import React from 'react';
import {Link} from "react-router-dom";
class Signup extends React.Component{
render(){
    return (
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup/cm">Signup as a CM</Link>
            </li>
            <li>
              <Link to="/signup/mp">Signup as a MP/MLA</Link>
            </li>
            <li>
              <Link to="/resident/signup">Signup as a Resident</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}
}
export default Signup;