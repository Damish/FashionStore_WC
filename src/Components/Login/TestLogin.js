import React from "react";
import { BrowserRouter as Router,Switch,Route, Link,Redirect,useHistory,useLocation } from "react-router-dom";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Login from "./Login";

export default function TestLogin() {
    return (
        <Router>
            <div className={"container"}>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/products">Fashion Store</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link class="nav-item nav-link" to="/products">Products</Link>
                            <Link class="nav-item nav-link" to="/shopping-cart">Shopping Cart</Link>
                            <Link class="nav-item nav-link" to="/wish-list">WishList</Link>
                            <Link class="nav-item nav-link" to="/protected3">Protected3</Link>

                        </div>
                    </div>
                </nav>


                <Switch>

                    <Route path="/products">
                        <AuthButton />
                        <Products/>
                    </Route>

                    <Route path="/login">
                        <AuthButton />
                        <LoginPage />

                    </Route>

                    <PrivateRoute path="/shopping-cart">
                        <AuthButton />
                        <ShoppingCart/>
                    </PrivateRoute>

                    <PrivateRoute path="/wish-list">
                        <AuthButton />
                        <Protected2/>
                    </PrivateRoute>

                    <PrivateRoute path="/protected3">
                        <AuthButton />
                        <Protected3/>
                    </PrivateRoute>

                </Switch>
            </div>
        </Router>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signOut(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function AuthButton() {
    let history = useHistory();

    return fakeAuth.isAuthenticated ? (

        <p>
            <p>You are now logged in.</p>

            Welcome!{" "}

            <button
                onClick={() => {
                    fakeAuth.signOut(() => history.push("/login"));
                }}
            >
                Sign out
            </button>

        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
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

    let { from } = location.state || { from: { pathname: "/" } };

    //here login is a callback function
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);

        });
    };


    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            {/*<button onClick={login}>Log in</button>*/}

            <Login loginFunc={login} />

        </div>
    );
}
