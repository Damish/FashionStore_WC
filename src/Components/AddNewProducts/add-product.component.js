import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
// import UploadFile from "../../utils/UploadFile";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        //bind methods to constructor
        this.onChangeProductImg = this.onChangeProductImg.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onChangeProductDesc = this.onChangeProductDesc.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_img: '',
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: 0,
            product_qty: 0,
            product_discount: 1
        }
    }

    onChangeProductImg(e) {
        this.setState({
            product_img: e.target.value
        });
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductCategory(e) {
        this.setState({
            product_category: e.target.value
        });
    }

    onChangeProductDesc(e) {
        this.setState({
            product_description: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductQty(e) {
        this.setState({
            product_qty: e.target.value
        });
    }

    onChangeProductDiscount(e) {
        this.setState({
            product_discount: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();


        console.log(`Form submitted:`);
        console.log(`Product Image: ${this.state.product_img}`);
        console.log(`Product Name: ${this.state.product_name}`);
        console.log(`Product Category: ${this.state.product_category}`);
        console.log(`Product Description: ${this.state.product_description}`);
        console.log(`Product Price: ${this.state.product_price}`);
        console.log(`Product Quantity: ${this.state.product_qty}`);
        console.log(`Product Discount: ${this.state.product_discount}`);

        if (!this.state.product_name || !this.state.product_category || !this.state.product_description || !this.state.product_price ||
            !this.state.product_qty || !this.state.product_discount) {
            return alert('Fill all the fields!!!')

        }

        const newProduct = {
            product_img: this.state.product_img,
            product_name: this.state.product_name,
            product_category: this.state.product_category,
            product_description: this.state.product_description,
            product_price: this.state.product_price,
            product_qty: this.state.product_qty,
            product_discount: this.state.product_discount

        };

        axios.post('http://localhost:5000/products/add', newProduct)
            .then(res => console.log(res.data));

        this.setState({
            product_img: '',
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: '',
            product_qty: '',
            product_discount: ''
        })
    }

    render() {
        return (

            <div className={"row justify-content-center"} style={{marginTop: 10}}>


                <div className={"col-md-9"}>

                    <h3>Add new product</h3>

                    <form onSubmit={this.onSubmit}>
                        {/*<UploadFile/>*/}


                        <div className="form-row">


                            <div className="form-group col-md-6">
                                <label>Image: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.product_img}
                                       onChange={this.onChangeProductImg}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Name: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.product_name}
                                       onChange={this.onChangeProductName}
                                />
                            </div>
                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-4">
                                <label>Category: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.product_category}
                                    onChange={this.onChangeProductCategory}
                                />
                            </div>
                            <div className="form-group col-md-5">
                                <label>Description: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.product_description}
                                       onChange={this.onChangeProductDesc}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Price: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.product_price}
                                    onChange={this.onChangeProductPrice}
                                />
                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-4">
                                <label>Quantity: </label>
                                <input type="number"
                                       className="form-control"
                                       value={this.state.product_qty}
                                       onChange={this.onChangeProductQty}
                                />
                            </div>
                            <div className="form-group col-md-8">
                                <label>Discount: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.product_discount}
                                    onChange={this.onChangeProductDiscount}
                                />
                            </div>
                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-4">
                            </div>

                            <div className="form-group col-md-4">
                                <input type="submit" value="Add New Product" className="btn btn-primary"/>
                            </div>

                            <div className="form-group col-md-4">
                                <Link className="btn btn-dark mr-2 mb-2" to={"/"}>Go Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        )
    }
}
