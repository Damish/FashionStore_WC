import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AdminControls extends Component {
    render() {
        return (
            <div>
                <div className={"ml-2 row"}>
                    <Link className=" nav-item nav-link text-white" to="/sign-up-sm">
                        <div className={"ml-1 mr-1 col bg-danger"}>
                            Register Store Manager
                        </div>
                    </Link>
                    <Link className="nav-item nav-link text-white" to="/addProduct">
                        <div className={"ml-1 mr-1 col bg-info"}>
                            Add Product
                        </div>
                    </Link>
                    <Link className="nav-item nav-link text-white"
                          to="/products">
                        <div className={"ml-1 col bg-warning"}>
                            Manage-Products
                        </div>
                    </Link>

                </div>
            </div>
        );
    }
}

export default AdminControls;