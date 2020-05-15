import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


class ViewOneProduct extends Component {

    constructor(props) {
        super(props);
        this.onChangeProductImg = this.onChangeProductImg.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onChangeProductDesc = this.onChangeProductDesc.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);

        this.state = {
            product_img: '',
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: '',
            product_qty: '',
            product_discount: ''
        }

    }

    //to retrieve the current product
    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_img: response.data.product_img,
                    product_name: response.data.product_name,
                    product_category: response.data.product_category,
                    product_description: response.data.product_description,
                    product_price: response.data.product_price,
                    product_qty: response.data.product_qty,
                    product_discount: response.data.product_discount,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    render() {
        return (
            <div>
                <div style={{width: '75%', margin: '3rem auto', textAlign: 'center'}}>
                    <h2>{this.state.product_name}</h2>
                </div>

                <div className="card mt-5 ml-auto mr-auto mb-5 " style={{width: '600px'}}>
                    <div className="box" style={{height: '100px'}}>
                        <div className="form-group  col-sm-8 ml-auto mr-auto mt-5">
                            <img src=".../" alt="..."></img>
                            {this.state.product_img}
                        </div>
                    </div>


                    <div className="form-group col-sm-8 ml-auto mr-auto">
                        <div className="row">
                            <div className="col">
                                <label><strong>Category: </strong></label>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={this.state.product_category}/>
                            </div>
                        </div>
                    </div>


                    <div className="form-group col-sm-8 ml-auto mr-auto">
                        <div className="row">
                            <div className="col">
                                <label><strong>Description: </strong></label>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={this.state.product_description}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm-8 ml-auto mr-auto">
                        <div className="row">
                            <div className="col">
                                <label><strong>Price: </strong></label>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={this.state.product_price}/>
                            </div>
                        </div>
                    </div>


                    <div className="form-group col-sm-8 ml-auto mr-auto">
                        <div className="row">
                            <div className="col">
                                <label><strong>Quantity:</strong> </label>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={this.state.product_qty}/>
                            </div>
                        </div>
                    </div>


                    <div className="form-group col-sm-8 ml-auto mr-auto">
                        <div className="row">
                            <div className="col">
                                <label><strong>Discount: </strong></label>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={this.state.product_discount}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group col-sm-4 ml-auto mr-auto">
                    <Link className="btn btn-primary ml-3 "
                          to={"/"}>Go Back . . .</Link>
                </div>
            </div>

        );
    }
}

export default ViewOneProduct;
