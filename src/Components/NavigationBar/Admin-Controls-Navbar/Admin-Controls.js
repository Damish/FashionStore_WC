import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AdminControls extends Component {
    render() {
        return (
            <div>
                <div className={"ml-1 row"}>
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

                    <Link className="nav-item nav-link text-white"
                          to="/categories">
                        <div className={"ml-1 col bg-primary"}>
                            Categories
                        </div>
                    </Link>

                    <li className=" ml-1 nav-item nav-link dropdown">

                        <a className="dropdown-toggle " href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manage Users
                        </a>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                            <Link className="nav-item nav-link text-white bg-dark"
                                  to="/sm_all">
                                Store Managers
                            </Link>

                            <Link className="nav-item nav-link text-white bg-info"
                                  to="/allUsers">
                                Users
                            </Link>
                        </div>


                    </li>





                </div>
            </div>
        );
    }
}

export default AdminControls;