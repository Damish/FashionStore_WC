import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {storage} from '../../firbase-config';
import DefaultImg from './assets/default-img.jpg';
import PleaseLogin from "../Login/PleaseLogin";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import HomeBG from "./assets/a1.jpg";

export default class AddProduct extends Component {


    constructor(props) {
        super(props);

        this.uploadImage = this.uploadImage.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onChangeProductDesc = this.onChangeProductDesc.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            firebaseImage: DefaultImg,
            progress: 0,

            product_name: '',
            product_category: '',
            product_description: '',
            product_price: 0,
            product_qty: 1,
            product_discount: 1,

            options: [],

            default_option: 'Select Category',


            myCategories: []


        }
    }

    componentDidMount() {

        console.log("ComponentDidMount:::")

        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({myCategories: response.data});


                this.state.myCategories.map((value, index) => {
                    this.state.options.push(value.cat_name);
                });

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductCategory(e) {
        console.log("Selected category " + e.value);
        console.log("Default option " + e.value);
        this.setState({
            product_category: e.value,
            default_option: e.value
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

    /////////Image Upload methods/////////

    setDefaultImage(uploadType) {
        if (uploadType === "firebase") {
            this.setState({
                firebaseImage: DefaultImg
            });
        }
    }

    uploadImage(e) {
        let imageObj = {};

        let currentImageName = "firebase-image-" + Date.now();

        let uploadImage = storage.ref('images/' + currentImageName).put(e.target.files[0]);

        uploadImage.on('state_changed',
            (snapshot) => {
                // progress function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            },
            (error) => {
                alert(error);
            },
            () => {
                storage.ref('images').child(currentImageName).getDownloadURL().then(url => {

                        this.setState({
                            firebaseImage: url
                        });

                        // store image object in the database
                        imageObj = {
                            imageName: currentImageName,
                            imageData: url,

                        };

                    }
                )
            })

    }


    ///Image Upload methods ends here/////

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.product_name || !this.state.product_category || !this.state.product_description || !this.state.product_price ||
            !this.state.product_qty || !this.state.product_discount) {
            return alert('Fill all the fields!!!')
        }

        const newProduct = {
            imageData: this.state.firebaseImage,
            product_name: this.state.product_name,
            product_category: this.state.product_category,
            product_description: this.state.product_description,
            product_price: this.state.product_price,
            product_qty: this.state.product_qty,
            product_discount: this.state.product_discount

        };

        axios.post('http://localhost:5000/products/add', newProduct)
            .then((response) => {

                alert('Product added successfully!!!')

                console.log(response.data);

            }, (error) => {

                console.log(error);
            });

        this.setState({
            // product_img: '',
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: '',
            product_qty: '',
            product_discount: ''
        })


    }

    render() {

        const style = {
            height: '400px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: ' 5px',

            options: [
                'one',
                'two',
                'three'
            ],

        };


        return (

            (localStorage.getItem("isLoggedin") === "true") ? (
                <div style={{backgroundColor:'#09252f'}}>

                    <div className={"row justify-content-center text-white"}style={{ height:'800px'}}>


                        <div className={"col-md-9"}>

                            <h3>Add new product</h3>


                            <form onSubmit={this.onSubmit}>

                                {/*//////////////////////////////////*/}
                                <div className={"row"}>
                                    <div className={"col"}>


                                        <div className="form-group col-sm-8 ml-auto mr-auto mt-5">
                                            <progress value={this.state.progress} max={'100'}/>
                                            <br/>
                                            <input type="file" className="process__upload-btn mt-2"
                                                   onChange={(e) =>
                                                       this.uploadImage(e)}/>
                                            <img src={this.state.firebaseImage} alt="" className="responsive-img"
                                                 style={style}/>
                                        </div>

                                        {/*//////////////////////////////////*/}

                                    </div>

                                    <div className={"col"}>

                                        <div className="form-row">

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


                                                <Dropdown className={"form-group mr-sm-2"} options={this.state.options}
                                                          value={this.state.default_option}
                                                          onChange={(e) => this.onChangeProductCategory(e)}
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
                                                       min={"1"}
                                                       onChange={this.onChangeProductQty}
                                                />
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label>Discount: </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={this.state.product_discount}
                                                    max={"100"}
                                                    min={"0"}
                                                    onChange={this.onChangeProductDiscount}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-3 mt-3">

                                            <div className="form-group col-md-4">
                                            </div>

                                            <div className="form-group col-md-4">
                                                <input type="submit" value="Add New Product"
                                                       className="btn btn-outline-success"/>
                                            </div>
                                        </div>

                                        <div className="form-row">

                                            <div className="form-group col-md-4">
                                                <Link className="btn btn-primary mr-2 mb-2" to={"/products"}>Go
                                                    back to
                                                    Products</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </form>
                        </div>

                    </div>

                </div>
            ) : (


                <PleaseLogin/>


            )

        )
    }
}
