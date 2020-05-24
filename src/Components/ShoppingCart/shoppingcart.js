import React, {Component} from 'react';
import Shoppingitem from "./shoppingitem";
import axios from 'axios';
import {Link} from "react-router-dom";
import PleaseLogin from "../Login/PleaseLogin";
import HomeBG from "../AddNewProducts/assets/a1.jpg";

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
                <div style={{backgroundImage: "url(" + HomeBG + ")",backgroundSize:'1680px 1080px', backgroundAttachment:'fixed'}}>
                    < div className={"container bg-dark p-3"}style={{paddingTop: "12%" , height:'800px',opacity:0.8}}>
                        <div className="card bg-danger  mb-5  ">
                            <h1 className="text-white text-center">Shopping cart</h1>
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
                                    <br/>


                                </div>
                            )


                        })

                    }
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div className={"row justify-content-end bg-dark"} >
                    <label className={"text-white btn btn-success mr-4"}>Total amount Rs.{this.state.billtotal}</label>
                </div>

                <div>
                    <Link className="btn btn-primary ml-3 btn-lg"
                          to={"/checkout"}>Check Out</Link>

                </div>

            </div>
                </div>
            ) : (


                <PleaseLogin/>


            )


        );
    }
}

export default Shoppingcart;