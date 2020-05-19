import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {fakeAuth} from "../Login/TestHome"
import AdminControls from "../NavigationBar/Admin-Controls-Navbar/Admin-Controls"
import StoreManagerControls from "../NavigationBar/StoreManager-Controls-NavBar/StoreManager-Controls"

class NavigationBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginStatus: "",
            userType: ""
        }

    }

    componentDidMount() {
        this.setState({
                loginStatus: fakeAuth.isAuthenticated
            }
        )
    }


    componentWillUnmount() {
        this.setState({
                loginStatus: fakeAuth.isAuthenticated
            }
        )
    }

    render() {

        let User_Type = window.atob(localStorage.getItem('Utype'));

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
                            <Link className="nav-item nav-link" to="/wish-list">WishList </Link>
                            {/*<Link className="nav-item nav-link" to="/protected3">Protected3</Link>*/}


                            {
                                (User_Type === "Admin") ? (

                                    <AdminControls/>

                                ) :
                                    (User_Type === "User") ? (

                                    // <Link className="nav-item nav-link " to="/sign-up">Sign up</Link>
                                            <div></div>
                                ) :
                                        (User_Type === "StoreManager") ? (

                                    <StoreManagerControls/>

                                ) : (
                                    <Link className="nav-item nav-link " to="/sign-up">Sign up</Link>
                                )
                            }

                        </div>

                    </div>
                            {/*//////////////login logout/////////////////*/}

                            <div className={"navbar-nav"}>

                            {

                                (fakeAuth.isAuthenticated) ? (

                                    <div className={"row md-4"}>
                                        <div className={"col"}>
                                        {
                                            (window.atob(localStorage.getItem("Utype")) === "Admin") ? (
                                                <label className={"text-danger nav-item nav-link"}>
                                                    {window.atob(localStorage.getItem("Utype"))} </label>
                                            ) : (window.atob(localStorage.getItem("Utype")) === "StoreManager") ? (
                                                <label className={"text-warning nav-item nav-link"}>
                                                    {window.atob(localStorage.getItem("Utype"))} </label>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        </div>
                                        <div className={"col"}>
                                        <h6 className={"text-white nav-item nav-link"}>
                                            {window.atob(localStorage.getItem("token-username"))}
                                        </h6>
                                        </div>
                                        <div className={"col"}>
                                        <Link className=" btn btn-danger" onClick={() => {
                                            fakeAuth.signOut();
                                            window.location.reload();
                                            //erase token values
                                            localStorage.setItem("token", "")
                                            localStorage.setItem("token-userId", "nouser")
                                            localStorage.setItem("token-username", "nouser")
                                            localStorage.setItem("isLoggedin", "false")
                                            localStorage.setItem("Utype", "")
                                            console.log("All Tokens erased")
                                        }}>
                                            Signout </Link>
                                        </div>
                                    </div>

                                ) : (

                                        <div className={"row md-4"}>
                                            <div className={"col"}>
                                                <h6 className={"text-white nav-item nav-link"}> Login/Signup </h6>
                                            </div>
                                            <div className={"col"}>
                                                 <Link className="btn btn-success " to="/sign-up">Signup</Link>
                                            </div>
                                            <div className={"col"}>
                                                <Link className=" btn btn-primary" to="/login">Login</Link>
                                            </div>
                                        </div>

                                )
                            }

                            </div>
                            {/*//////////////login logout end/////////////////*/}

                </nav>
            </div>
        );
    }
}

export default NavigationBar;