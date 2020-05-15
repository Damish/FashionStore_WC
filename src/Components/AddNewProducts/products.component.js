import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Table, Button } from 'react-bootstrap';


export default class Products extends Component {

    constructor() {
        super();
        // this.removePrcoduct = new RemoveProduct();
        this.state = {
            products: []
        };
        this.deleteProduct = this.deleteProduct.bind(this);
    }


    componentDidMount() {
        this.getProductList();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.getProductList();
    // }


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
            <div>

                <div className={"box m-2"} style={{width: "260px","background": "white", "padding": "10px", "box-shadow": "0 0 33px -10px"}}>


                    <div className="card  m-1 ">

                        <div className="thumbnail ml-3 mr-3 mb-3">

                            <div className="caption" style={{textAlign: 'center'}}>
                                <h3>{this.props.product.product_name}</h3></div>
                            <div className="row">
                                <img src=".../" alt="..."></img>
                                {this.props.product.product_img}
                            </div>

                            <label className="mr-2">Category:{this.props.product.product_category}</label>


                            <label className="mr-2">Description:{this.props.product.product_description}</label>


                            <label className="mr-2">Price:{this.props.product.product_price}</label>


                            <label className="mr-2">Available Quantity:{this.props.product.product_qty}</label>


                            <label className="mr-2">Discount:{this.props.product.product_discount}</label>

                            <div className="row mb-2">

                                <div className="col">
                                    <Link className="btn btn-outline-warning mr-2"
                                          to={"/edit/" + this.props.product._id}>Edit</Link>
                                </div>

                                <div className="col">
                                    <button type="submit" onClick={() => this.deleteProduct(this.props.product._id)}
                                            className="btn btn-outline-danger">Remove
                                    </button>
                                </div>

                            </div>

                            <div className="row">
                                <div className={"col"}>

                                    <button className={"btn btn-outline-primary mr-2"} type={"button"}
                                            onClick={(event) => this.onAddtoCart(this.props.product._id)}>
                                        <label>Add To Cart</label>
                                        <i className="fa fa-shopping-cart"> </i>
                                    </button>

                                </div>
                                <div className={"col"}>

                                    <button className={"btn btn-outline-primary"} type={"button"}
                                            onClick={(event) => this.onAddtoWishList(this.props.product._id)}>
                                        <label>Add To Wishlist</label>
                                        <i className="fa fa-heart-o" style={{"color": "red"}}> </i>
                                    </button>

                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>

        )
    }

}
