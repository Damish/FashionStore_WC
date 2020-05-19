import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Table, Button } from 'react-bootstrap';
import no_image_available from '../images/no_image_available.jpg';

export default class Products extends Component {

    constructor() {
        super();
        // this.removePrcoduct = new RemoveProduct();
        this.state = {
            products: []
        };
    }


    componentDidMount() {
        this.getProductList();
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

    onAddtoWishList(wcid,wpid,wname,wprice,wdiscount){

        console.log(`add to wishlist:`);
        console.log(`wish cusid: `+wcid);
        console.log(`wish productid:`+wpid);
        console.log(`wish name:`+wname);
        console.log(`wish price :`+wprice);
        console.log(`wish price :`+wdiscount);

        const newWish = {
            wish_cusid :wcid ,
            wish_productid:wpid,
            wish_name:wname,
            wish_price:wprice,
            wish_discount: wdiscount
        };

        axios.post('http://localhost:5000/mern/addwish', newWish)
            .then(res => console.log(res.data));

        this.setState({
            wish_cusid : '',
            wish_productid: '',
            wish_name: '',
            wish_price: '',
            wish_discount:''
        })

        window.location.replace("/wish-list")
    }

    onAddtoCart(e) {
        console.log(" onAddtoCart() called. Product id to be added : " + e);

    }


    render() {
        return (
            <div>

                <div className={"box m-2"}
                     style={{width: "260px", "background": "white", "padding": "7px", "box-shadow": "0 0 10px -5px"}}>


                    <div className="thumbnail ml-3 mr-3 mb-3">

                        <div className="caption" style={{textAlign: 'center'}}>
                            <h3>{this.props.product.product_name}</h3></div>
                        <div className="row justify-content-center">
                            <div className={"col"}>

                                <img src={this.props.product.imageData} className={"container"}/>

                                {/*{this.props.product.product_img}*/}
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

                        <br/>

                        <div className="row justify-content-center">

                            <Link className="btn btn-outline-dark mr-2"
                                  to={"/oneProduct/" + this.props.product._id}>View</Link>

                            <Link to={"/shopping-cart"} className={"btn btn-outline-primary mr-2"} type={"button"}
                                  onClick={(event) => this.onAddtoCart(this.props.product._id)}>

                                <i className="fa fa-shopping-cart"> </i>
                            </Link>


                            <Link to={"/wish-list"} className={"btn btn-outline-primary mr-2"} type={"button"}
                                  onClick={()=>this.onAddtoWishList(
                                      window.atob(localStorage.getItem("token-username")),
                                      this.props.product._id,
                                      this.props.product.product_name,
                                      this.props.product.product_price,
                                      this.props.product.product_discount
                                  )}>


                                <i className="fa fa-heart-o" style={{"color": "red"}}> </i>

                            </Link>

                            <Link className=" btn btn-danger">-{this.props.product.product_discount}%</Link>

                        </div>


                    </div>
                </div>
            </div>

        )
    }

}
