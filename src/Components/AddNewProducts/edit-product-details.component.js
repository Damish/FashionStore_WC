import React, {Component} from 'react';
import axios from 'axios';
import PleaseLogin from "../Login/PleaseLogin";
import { storage } from '../../firbase-config';
import DefaultImg from './assets/default-img.jpg';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

export default class EditProductDetails extends Component {

    constructor(props) {
        super(props);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onChangeProductDesc = this.onChangeProductDesc.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            firebaseImage: DefaultImg,
            product_name: '',
            product_category: '',
            product_description: '',
            product_price: '',
            product_qty: '',
            product_discount: '',
            imageData:'',
            progress:0,

            options : [],

            default_option:'Select Category',

            myCategories:[]

        }
    }


    //to retrieve the current product

    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    // product_img: response.data.product_img,
                    imageData: response.data.imageData,
                    product_name: response.data.product_name,
                    product_category: response.data.product_category,
                    product_description: response.data.product_description,
                    product_price: response.data.product_price,
                    product_qty: response.data.product_qty,
                    product_discount: response.data.product_discount,
                    default_option:response.data.product_category

                })
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({myCategories: response.data});


                this.state.myCategories.map((value,index) => {
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
        console.log("Selected category "+ e.value);
        console.log("Default option "+ e.value);
        this.setState({
            product_category: e.value,
            default_option:e.value
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




    setDefaultImage(uploadType) {
        if (uploadType === "firebase") {
            this.setState({
                firebaseImage: DefaultImg
            });
        }}

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
                        imageData: url
                    };


                })
            })

    }




    onSubmit(e) {
        e.preventDefault();

        const obj = {

            imageData:this.state.firebaseImage,
            product_name: this.state.product_name,
            product_category: this.state.product_category,
            product_description: this.state.product_description,
            product_price: this.state.product_price,
            product_qty: this.state.product_qty,
            product_discount: this.state.product_discount
        };

        console.log(obj);
        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data)
                // this.setDefaultImage(this.state.firebaseImage);
            }, (error) => {
                console.log("Mongodb error")
                console.log(error);
            });


        this.props.history.push('/products');
        window.location.reload();
    }


    render() {
        const style = {
            height: '400px',
            width:'400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:' 5px'
        };
        return (

            (localStorage.getItem("isLoggedin") === "true") ? (


                <div className={"row justify-content-center"} style={{marginTop: 10}}>
                    <div className={"col-md-9"}>

                        <h3 align="center">Update product details</h3>
                        <form onSubmit={this.onSubmit}>


                            <div className={"row"}>
                                <div className={"col"}>


                            <div className="form-group col-sm-8 ml-auto mr-auto mt-5">
                                <progress value={this.state.progress} max={'100'}/>
                                <br/>
                                <input type="file"
                                       onChange={(e) =>
                                           this.uploadImage(e)} />
                                <img src={this.state.firebaseImage} alt={''} style={style}/>
                            </div>

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


                                    <Dropdown className="form-group mr-sm-2"
                                              options={this.state.options}
                                              value={this.state.default_option}
                                              onChange={(e) =>this.onChangeProductCategory(e)}
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


                            <br/>

                            <div className="form-group mb-4">
                                <input type="submit" value="Update Details" className="btn btn-primary"/>
                            </div>


                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            ):(


                <PleaseLogin/>


            )

        )
    }
}
