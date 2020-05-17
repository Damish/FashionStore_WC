import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
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
import PleaseLogin from "./PleaseLogin";

export default class TestHome extends Component {

    render() {

        return (
            <Router>
                <div className={""}>

                    <Switch>

                        <Route path="/oneProduct/:id">
                            <NavigationBar/>
                            <Route path="/oneProduct/:id" component={ViewOneProduct}/>
                        </Route>

                        <PrivateRoute3 exact path="/edit/:id" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <Route path="/edit/:id" component={EditProductDetails}/>
                        </PrivateRoute3>

                        <Route path="/products_common">
                            <NavigationBar/>
                            <ProductsHome_common/>
                        </Route>

                        <PrivateRoute3 exact path="/addProduct" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <Route path="/addProduct" component={Add_Product}/>
                        </PrivateRoute3>

                        <PrivateRoute3 exact path="/sign-up-sm" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <SignUpStoreManager/>
                        </PrivateRoute3>

                        <PrivateRoute3 exact path="/products" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <ProductsHome/>
                        </PrivateRoute3>

                        <Route path="/login">
                            <NavigationBar/>
                            <LoginPage/>
                        </Route>

                        <Route path="/sign-up">
                            <NavigationBar/>
                            <SignUp/>
                        </Route>

                        <PrivateRoute3 exact path="/wish-list" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <WishList/>
                        </PrivateRoute3>

                        <PrivateRoute3 exact path="/shopping-cart" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <ShoppingCart/>
                        </PrivateRoute3>

                        <PrivateRoute3 exact path="/protected3" isAuthenticated={fakeAuth.isAuthenticated}
                                       isLoggedin1={true}>
                            <NavigationBar/>
                            <Protected3/>
                        </PrivateRoute3>

                    </Switch>
                </div>
            </Router>
        );
    }

    componentDidMount() {
        if (localStorage.getItem("isLoggedin") === "true") {
            console.log("ComponentDidMount:::TestHome")
            console.log("setting fakeAuth.isAuthenticated = true;")
            fakeAuth.isAuthenticated = true;
            fakeAuth.authenticate(this);
        } else {
            console.log("ComponentDidMount:::TestHome")
            console.log("setting fakeAuth.isAuthenticated = false;")
            fakeAuth.isAuthenticated = false;
        }
    }
}

export const fakeAuth = {
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

const PrivateRoute3 = ({component: Component, isAuthenticated, isLoggedin1, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? (<Component {...props} {...rest} />)
            :
            (
                isLoggedin1 === true
                    ? (Component)
                    :
                    (<Redirect to="/login"/>)
            )
    )}/>
);


function Protected3() {
    return (
        (localStorage.getItem("isLoggedin") === "true") ? (
            <h3>Protected3</h3>
        ) : (
            <PleaseLogin/>
        )
    );
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
            {/*<p>You must log in to view the page at {from.pathname}</p>*/}
            <Login loginFunc={login}/>
        </div>
    );
}
