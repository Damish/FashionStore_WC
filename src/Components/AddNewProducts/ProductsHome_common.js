import React, {Component} from 'react';
import Product_component_common from "./products.component_common";
import axios from "axios";
import HomeBG from "./assets/asa.jpg"

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
            <div style={{backgroundImage: "url(" + HomeBG + ")"}}>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"jumbotron m-auto jumbotron-fluid bg-info"} >
                            <h1 className={"text-white"}>Browse Products</h1>
                        </div>
                    </div>
                </div>

                <div className={"row pt-2 pl-5 pr-5 justify-content-center"}>
                    {
                        this.state.products.map(function (currentProduct, i) {
                            return <Product_component_common product={currentProduct} key={i}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ProductsHome;
