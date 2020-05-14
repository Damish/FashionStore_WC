import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <Link className="navbar-brand ml-5" to="/products">Fashion Store</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link className="nav-item nav-link" to="/products">Products</Link>
                            <Link className="nav-item nav-link" to="/shopping-cart">Shopping Cart</Link>
                            <Link className="nav-item nav-link" to="/wish-list">WishList</Link>
                            <Link className="nav-item nav-link" to="/protected3">Protected3</Link>
                            <Link className="nav-item nav-link " to="/sign-up">Sign up</Link>

                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;