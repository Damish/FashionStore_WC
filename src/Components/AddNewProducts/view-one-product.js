import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import BeautyStars from "beauty-stars";
import CommentList from "../Comment/CommentList";

class ViewOneProduct extends Component {

    constructor(props) {
        super(props);
        this.onChangeProComments = this.onChangeProComments.bind(this);
        this.onAddtoCommentList = this.onAddtoCommentList.bind(this);

        this.state = {
            product_img: '',
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: '',
            product_qty: '',
            product_discount: '',
            imageData: 'no url found',
            pro_comment: '',
            value: 1.5,
        }

    }

    //to retrieve the current product
    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    imageData: response.data.imageData,
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


    /////functions related to comments/////

    onChangeProComments(e) {
        this.setState({
            pro_comment: e.target.value
        });
    }

    onAddtoCommentList(e) {

        e.preventDefault();
        console.log(`comment:${this.state.pro_comment}`);
        console.log(this.state.value);

        const newComment = {

            userId: window.atob(localStorage.getItem("token-username")),
            productId: this.props.match.params.id,
            commentBody: this.state.pro_comment,
            rating: this.state.value,

        };

        axios.post('http://localhost:5000/mern/addcomment', newComment)

            .then((response) => {

                console.log('Comment added successfully!!!')
                console.log(response.data);

            }, (error) => {
                console.log('comment adding unsuccessful!!!')
                console.log(error);
            });


        this.setState({
            pro_comment: '',
            value: 1,

        })
        window.location.reload();


    }

    ///////end of comment functions////////


    render() {
        return (
            <div>

                <div className={"row"}>
                    <div className={"col md-8"}>

                        <div style={{width: '75%', margin: '3rem auto', textAlign: 'center'}}>
                            <h2>{this.state.product_name}</h2>
                        </div>

                        <div className="card mt-5 ml-auto mr-auto mb-5 " style={{width: '600px'}}>
                            <div className="row justify-content-center">
                                <div className={"col"}>

                                    <img src={this.state.imageData} className={"container"}/>

                                </div>
                            </div>


                            <div className="form-group col-sm-8 ml-auto mr-auto">
                                <div className="row">
                                    <div className="col">
                                        <label><strong>Category: </strong></label>
                                    </div>
                                    <div className="col">
                                        <label>{this.state.product_category}</label>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group col-sm-8 ml-auto mr-auto">
                                <div className="row">
                                    <div className="col">
                                        <label><strong>Description: </strong></label>
                                    </div>
                                    <div className="col">
                                        <label>{this.state.product_description}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-sm-8 ml-auto mr-auto">
                                <div className="row">
                                    <div className="col">
                                        <label><strong>Price: </strong></label>
                                    </div>
                                    <div className="col">
                                        <label>{this.state.product_price}</label>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group col-sm-8 ml-auto mr-auto">
                                <div className="row">
                                    <div className="col">
                                        <label><strong>Quantity:</strong> </label>
                                    </div>
                                    <div className="col">
                                        <label>{this.state.product_qty}</label>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group col-sm-8 ml-auto mr-auto">
                                <div className="row">
                                    <div className="col">
                                        <label><strong>Discount: </strong></label>
                                    </div>
                                    <div className="col">
                                        <label>{this.state.product_discount}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm-4 ml-auto mr-auto">
                            <Link className="btn btn-primary ml-3 "
                                  to={"/products_common"}>Go to products page</Link>
                        </div>


                    </div>
                    <div className={"col md-4"}>


                        <div className="container">


                            <div className={"row justify-content-center "}>


                                <div className={"col-md-8 mt-5"}>

                                    <label> Rate the product:</label>

                                    <br/>

                                    <BeautyStars
                                        value={this.state.value}
                                        onChange={value => this.setState({value})}
                                    />


                                    <form onSubmit={this.onAddtoCommentList}>
                                        <div className="form-group">
                                            <label htmlFor="comment">Your Comment</label>
                                            <textarea name="comment" className="form-control-md" rows="3" cols="50"
                                                      value={this.state.pro_comment}
                                                      onChange={this.onChangeProComments}></textarea>
                                        </div>
                                        <input type="submit" value="send" className="btn btn-primary"/>
                                    </form>


                                </div>
                                <br/>
                                <br/>

                            </div>


                            <br/>
                            <br/>
                            <br/>


                            <div col-md-6>
                                <CommentList prodid={this.props.match.params.id}/>
                            </div>

                        </div>


                    </div>
                </div>


                <br/>

            </div>


        );
    }
}

export default ViewOneProduct;
