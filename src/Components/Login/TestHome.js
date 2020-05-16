import React, {Component} from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Login from "./Login";
import WishList from "../WishList/WishList";
import NavigationBar from "../NavigationBar/NavigationBar";
import SignUp from "../SignUp/SignUp";
import ProductsHome from "../AddNewProducts/ProductsHome";
import ProductsHome_common from "../AddNewProducts/ProductsHome_common";
import SignUpStoreManager from "../SignUp/SignUpStoreManager";
import Add_Product from "../AddNewProducts/add-product.component"
import EditProductDetails from "../AddNewProducts/edit-product-details.component";
import ViewOneProduct from "../AddNewProducts/view-one-product"

export default class TestHome extends Component {

    render() {

        return (
            <Router>
                <div className={""}>

                    {/*<NavigationBar/>*/}

                    <Switch>

                        <PrivateRouteToProductsCommon path="/oneProduct/:id">
                            <AuthButton_with_Navbar/>
                            <Route path="/oneProduct/:id" component={ViewOneProduct}/>
                        </PrivateRouteToProductsCommon>

                        <PrivateRouteToProductsCommon path="/edit/:id">
                            <AuthButton_with_Navbar/>
                            <Route path="/edit/:id" component={EditProductDetails}/>
                        </PrivateRouteToProductsCommon>

                        <Route path="/products_common">
                            <AuthButton_with_Navbar/>
                            <ProductsHome_common/>
                        </Route>

                        <PrivateRouteToProductsCommon path="/addProduct">
                            <AuthButton_with_Navbar/>
                            <Route path="/addProduct" component={Add_Product}/>
                        </PrivateRouteToProductsCommon>


                        <PrivateRouteToProductsCommon path="/sign-up-sm">
                            <AuthButton_with_Navbar/>
                            <SignUpStoreManager/>
                        </PrivateRouteToProductsCommon>

                        <PrivateRouteToProductsCommon path="/products">
                            <AuthButton_with_Navbar/>
                            <ProductsHome/>
                        </PrivateRouteToProductsCommon>

                        <Route path="/login">
                            <AuthButton_with_Navbar/>
                            <LoginPage/>
                        </Route>

                        <Route path="/sign-up">
                            <AuthButton_with_Navbar/>
                            <SignUp/>
                        </Route>

                        <PrivateRoute path="/shopping-cart">

                            {
                                (fakeAuth.isLoggedin) ? (
                                    <div>
                                        <AuthButton_with_Navbar/>
                                        <ShoppingCart/>
                                    </div>
                                ) : (
                                    <div>
                                        {/*<AuthButton_with_Navbar/>*/}
                                        <h2> logged in false</h2>
                                    </div>
                                )
                            }

                        </PrivateRoute>
                        <PrivateRoute path="/wish-list">
                            {
                                (fakeAuth.isLoggedin) ? (
                                    <div>
                                        <AuthButton_with_Navbar/>
                                        <WishList/>
                                    </div>
                                ) : (
                                    <div>
                                        {/*<AuthButton_with_Navbar/>*/}
                                        <h2> logged in false</h2>
                                    </div>
                                )
                            }
                        </PrivateRoute>
                        <PrivateRoute path="/protected3">
                            <AuthButton_with_Navbar/>
                            <Protected3/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        );
    }

    componentDidMount() {

        if (localStorage.getItem("token")) {
            fakeAuth.isAuthenticated = true;

        } else {
            fakeAuth.isAuthenticated = false;
        }

    }

}

const fakeAuth = {

    isLoggedin: localStorage.getItem("isLoggedin"),

    isAuthenticated: false,

    authenticate(cb) {

        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signOut() {

        window.location.reload();
        fakeAuth.isAuthenticated = false;
    }
};


function AuthButton_with_Navbar() {
    let history = useHistory();

    return (fakeAuth.isAuthenticated) ? (
        <div>
            <div>
                <div className={"row"}>
                    <div className="col bg-dark">
                        <NavigationBar/>
                    </div>
                    <div className="col-md-4 bg-dark">
                        <div className={"row"}>
                            <div className={"col"}>
                                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
                                    <div className="navbar-nav">

                                        {
                                            (window.atob(localStorage.getItem("Utype")) === "Admin") ? (

                                                <label className={"text-danger nav-item nav-link"}>
                                                    {window.atob(localStorage.getItem("Utype"))} </label>

                                            ) : (window.atob(localStorage.getItem("Utype")) === "StoreManager") ? (

                                                <label className={"text-warning nav-item nav-link"}>
                                                    {window.atob(localStorage.getItem("Utype"))} </label>

                                            ):(
                                                <div></div>
                                            )
                                        }


                                        <h6 className={"text-white nav-item nav-link"}>
                                            {window.atob(localStorage.getItem("token-username"))} </h6>

                                            <Link className=" btn btn-danger" onClick={() => {
                                                fakeAuth.signOut();
                                                //erase token values
                                                localStorage.setItem("token", "")
                                                localStorage.setItem("token-userId", "")
                                                localStorage.setItem("token-username", "")
                                                localStorage.setItem("isLoggedin", "false");
                                                localStorage.setItem("Utype", "")
                                                console.log("All Tokens erased")
                                            }}>
                                                Sign out </Link>

                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ) : (
        <div>
            <div className={"row"}>
                <div className="col bg-dark">
                    <NavigationBar/>
                </div>
                <div className="col-sm-4 bg-dark">
                    <div className={"row"}>

                        <div className={"col"}>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
                                <div className="navbar-nav">
                                    <h6 className={"text-white nav-item nav-link"}> Not Logged in </h6>
                                    <Link className=" btn btn-primary" to="/login">Login</Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({children, ...rest}) {

    return (
        <Route
            {...rest}
            render={({location}) =>

                fakeAuth.isAuthenticated ? (

                    children


                ) : (

                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}


// A wrapper for <Route> that redirects to the products common homepage
// screen if you're not yet authenticated.
function PrivateRouteToProductsCommon({children, ...rest}) {

    return (
        <Route
            {...rest}
            render={({location}) =>

                fakeAuth.isAuthenticated ? (

                    children


                ) : (

                    <Redirect
                        to={{
                            pathname: "/products_common",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}


function Products() {
    return <h3>Products</h3>;
}

function Protected2() {
    return <h3>Protected2</h3>;
}

function Protected3() {
    return <h3>Protected3</h3>;
}


function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/products_common"}};

    //here login is a callback function
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);

        });
    };


    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>

            <Login loginFunc={login}/>

        </div>
    );
}
