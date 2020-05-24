import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PleaseLogin from "../Login/PleaseLogin";


export default class Products extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        };
        this.deleteProduct = this.deleteProduct.bind(this);
    }


    componentDidMount() {
        this.getProductList();
    }


    deleteProduct(id) {
        axios.get('http://localhost:5000/products/deleteProduct/' + id)
            .then(() => {
                console.log('Product Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })


        this.getProductList();


        this.setState({
            ...this.state.products
        })

        window.location.reload();

    }


    getProductList() {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onAddtoWishList(e) {
        console.log(" onAddtoWishList() called. Product id to be added : " + e);
    }

    onAddtoCart(e) {
        console.log(" onAddtoCart() called. Product id to be added : " + e);
    }


    render() {
        return (

            (localStorage.getItem("isLoggedin") === "true") ? (

                <div>


                    <div className={"box m-2"}
                         style={{
                             width: "260px",
                             "background": "white",
                             "padding": "7px",
                             "box-shadow": "0 0 10px -5px"
                         }}>


                        <div className="thumbnail ml-3 mr-3 mb-3">

                            <div className="caption" style={{textAlign: 'center'}}>
                                <h3>{this.props.product.product_name}</h3></div>
                            <div className="row justify-content-center">
                                <div className={"col"}>

                                    <img src={this.props.product.imageData} className={"container"}/>

                                </div>
                            </div>
                            <label className="mr-2">Category:{this.props.product.product_category}</label>
                            <br/>
                            <label className="mr-2">Description:{this.props.product.product_description}</label>
                            <br/>

                            <div className={"row"}>
                                <div className={"col"}>
                                    <label className=" btn btn-primary">Rs.{this.props.product.product_price}</label>
                                </div>
                            </div>

                            <div className="row justify-content-center mt-2 mb-2">

                                <Link className=" btn btn-danger">-{this.props.product.product_discount}%</Link>

                            </div>


                            <div className="row justify-content-center">

                                <Link className="btn btn-outline-dark mr-2"
                                      to={"/oneProduct/" + this.props.product._id}>View</Link>

                                <Link className="btn btn-outline-warning mr-2"
                                      to={"/edit/" + this.props.product._id}>Edit</Link>

                                <Link type="submit" onClick={() => this.deleteProduct(this.props.product._id)}
                                      className="btn btn-outline-danger mr-2">Remove </Link>

                            </div>


                        </div>

                    </div>
                </div>
            ):(


                <PleaseLogin/>


            )

        )
    }

}
