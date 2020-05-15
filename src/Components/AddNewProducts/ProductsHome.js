import React, {Component} from 'react';
import Products from "./products.component";
import axios from "axios";


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
            <div>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"jumbotron jumbotron-fluid bg-info"} >
                            <h1 className={"text-white"}>Browse Products</h1>
                        </div>
                    </div>
                </div>

                <div className={"row justify-content-start"}>
                    {
                        this.state.products.map(function (currentProduct, i) {
                            return <Products product={currentProduct} key={i}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ProductsHome;
