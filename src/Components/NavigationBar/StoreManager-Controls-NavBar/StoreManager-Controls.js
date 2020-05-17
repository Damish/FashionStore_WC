import React, {Component} from 'react';
import {Link} from "react-router-dom";

class StoreManagerControls extends Component {
    render() {
        return (
            <div>
                <div className={"ml-2 row"}>

                    <Link className=" nav-item nav-link text-white" to="/sign-up">
                        <div className={"ml-1 mr-1 col bg-info"}>
                            Sign up
                        </div>
                    </Link>
                    <Link className=" nav-item nav-link text-white" to="/addProduct">
                        <div className={"ml-1 mr-1 col bg-danger"}>
                            Add Product
                        </div>
                    </Link>
                    <Link className=" nav-item nav-link text-white" to="/products">
                        <div className={"ml-1 mr-1 col bg-warning"}>
                            Manage-Products
                        </div>
                    </Link>

                </div>
            </div>
        );
    }
}

export default StoreManagerControls;