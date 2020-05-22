import React, {Component} from 'react';
import Shoppingitem from "./shoppingitem";
import axios from 'axios';
import {Link} from "react-router-dom";
import PleaseLogin from "../Login/PleaseLogin";

class Shoppingcart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: [],
            billtotal: 0,
        };
        localStorage.setItem("total",0);
        this.state.customerId = "";
    }

    componentDidMount() {

        let cust_id = window.atob(localStorage.getItem("token-username"));

        axios.get('http://localhost:5000/shop/' + cust_id)
            .then(response => {
                this.setState({shop: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getBilltot=()=> {
          this.setState({
              billtotal:localStorage.getItem("total"),
          })

    }




    render() {
        return (
            (localStorage.getItem("isLoggedin") === "true") ? (
            < div className="Container mt-5">
                <div className="card mb-5 ">
                    <h1 className="text-center">ShoppingCart</h1>
                </div>

                <div>
                    {

                        this.state.shop.map((value, index) => {


                            return (
                                <div>

                                    <Shoppingitem
                                        s_pid={value.shop_productid}
                                        s_name={value.shop_proname}
                                        s_price={value.shop_proprice}
                                        s_discount={value.shop_prodiscount}
                                        onBilltotChange={this.getBilltot}
                                    />


                                </div>
                            )


                        })

                    }
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div>
                    {this.state.billtotal}
                </div>

                <div>
                    <Link className="btn btn-primary ml-3 "
                          to={"/checkout"}>Check Out</Link>

                </div>

            </div>
            ) : (


                <PleaseLogin/>


            )


        );
    }
}

export default Shoppingcart;