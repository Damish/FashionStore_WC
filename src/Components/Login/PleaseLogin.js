import React, {Component} from 'react';
import {Link} from "react-router-dom";

class PleaseLogin extends Component {
    render() {
        return (
            <div>
                <div className={"row bg-warning"}>
                    <div className={"col"}>
                        Please Login to continue..
                        <Link className="btn btn-primary text-white" to="/login"> Login</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PleaseLogin;