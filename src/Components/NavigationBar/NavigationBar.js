import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavigationBar extends Component {

    constructor(props) {
        super(props);

        this.state = {

            userType: ""
        }

    }


    render() {

        let User_Type = localStorage.getItem('Utype');

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <Link className="navbar-brand ml-5" to="/products_common">Fashion Store</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link className="nav-item nav-link " to="/products_common">Products</Link>
                            <Link className="nav-item nav-link" to="/shopping-cart">Shopping Cart</Link>
                            <Link className="nav-item nav-link" to="/wish-list">WishList</Link>
                            <Link className="nav-item nav-link" to="/protected3">Protected3</Link>


                            {
                                (User_Type === "Admin") ? (

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


                                ) : (User_Type === "User") ? (

                                    <Link className="nav-item nav-link " to="/sign-up">Sign up</Link>

                                ) : (User_Type === "StoreManager") ? (
                                    <div className={"ml-2 row"}>


                                        <Link className=" nav-item nav-link text-white" to="/sign-up">
                                            <div className={"ml-1 mr-1 col bg-info"}>
                                                Sign up
                                            </div>
                                        </Link>

                                        <Link className=" nav-item nav-link text-white" to="/addProduct">
                                            <div className={"ml-1 mr-1 col bg-danger"}>
                                                Add Product
                                            </div>
                                        </Link>

                                        <Link className=" nav-item nav-link text-white" to="/products">
                                            <div className={"ml-1 mr-1 col bg-warning"}>
                                                Manage-Products
                                            </div>
                                        </Link>


                                    </div>
                                ) : (
                                    <Link className="nav-item nav-link " to="/sign-up">Sign up</Link>
                                )
                            }


                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;