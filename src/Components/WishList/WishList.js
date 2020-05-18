import React, {Component} from 'react';
import Wishitem from "./Wishitem";
import axios from 'axios';
import PleaseLogin from "../Login/PleaseLogin";
import {Link} from "react-router-dom";

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {mern: []};
        this.state.customerId = "";
    }

    componentDidMount() {

        console.log("ComponentDidMount:::WishList>>>>>>>s")

        let cus_id = window.atob(localStorage.getItem("token-username"));

        axios.get('http://localhost:5000/mern/' + cus_id)
            .then(response => {
                this.setState({mern: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    render() {

        return (

            (localStorage.getItem("isLoggedin") === "true") ? (

                < div className={"container mt-5 bg-info p-3"}>
                    <div className="card mb-5  ">
                        <h1 className=" text-center">WishList</h1>
                    </div>
                    <div>
                        {
                            this.state.mern.map((value) => {
                                return (
                                    <div>
                                        <Wishitem
                                            wi_pid={value.wish_productid}
                                            wi_name={value.wish_name}
                                            wi_price={value.wish_price}
                                            wi_discount={value.wish_discount}
                                        />
                                    </div>
                                )
                            })


                        }
                        <br/>
                        <br/>
                        <br/>
                    </div>

                    <Link className="btn btn-primary mb-3 "
                          to={"/products_common"}>Go to products page</Link>

                </div>

            ) : (


                <PleaseLogin/>


            )


        );


    }


}

export default WishList;
