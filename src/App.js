import React from 'react';
import './App.css';
import TestHome from "./Components/Login/TestHome";
import {Route} from "react-router-dom";

import { BrowserRouter as Router, Link } from "react-router-dom";
import AddProduct from "./Components/AddNewProducts/add-product.component";
import EditProductDetails from "./Components/AddNewProducts/edit-product-details.component";
import Products from "./Components/AddNewProducts/products.component";
import ProductsHome from "./Components/AddNewProducts/ProductsHome";
import ViewOneProduct from "./Components/AddNewProducts/view-one-product";


function App() {
  return (
    <div className="App">

          {/*<TestHome/>*/}

        {/*<h5>You are working on testBranch</h5>*/}

        <Router>
            <div className="container">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

                    {/*<Link to="/" className="navbar-brand">New Products </Link>*/}
                    <div className="collpase navbar-collapse">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">WebSiteName</a>
                        </div>
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Add Products</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/SignUp" className="nav-link">Sign Up</Link></li>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                        </ul>
                    </div>
                </nav>

                <br/>
                <Route path="/" exact component={ProductsHome} />
                <Route path="/edit/:id" component={EditProductDetails} />
                <Route path="/create" component={AddProduct} />
                <Route path="/oneProduct/:id" component={ViewOneProduct}/>
                {/*<Route path="/delete/:id" component={RemoveProduct} />*/}
                {/*<Route path="/remove" component={RemoveProduct} />*/}
            </div>
        </Router>





    </div>
  );
}

export default App;
