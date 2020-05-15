import React, {Component} from 'react';
import CartItem from "./CartItem";

class ShoppingCart extends Component {


    render() {

        return (
            <div className={"jumbotron bg-warning"}>

                <h1>Shopping cart</h1>

                <h3>Username : {  window.atob(localStorage.getItem("token-username") )  }</h3>

                <CartItem/>
                <CartItem/>
                <CartItem/>

            </div>
        );
    }
}

export default ShoppingCart;
