import React, {Component} from 'react';
import Product_component from "./products.component";
import axios from "axios";
import PleaseLogin from "../Login/PleaseLogin";


class ProductsHome extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (

            (localStorage.getItem("isLoggedin") === "true") ? (

            <div>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"jumbotron m-auto jumbotron-fluid bg-warning"} >
                            <h1 className={"text-white"}>Manage Products</h1>
                        </div>
                    </div>
                </div>

                <div className={"row pt-2 pl-5 pr-5 justify-content-center"}>
                    {
                        this.state.products.map(function (currentProduct, i) {
                            return <Product_component product={currentProduct} key={i}/>;
                        })
                    }
                </div>
            </div>
            ):(


                <PleaseLogin/>


            )
        );
    }
}

export default ProductsHome;
