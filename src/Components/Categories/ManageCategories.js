import React, {Component} from 'react';
import axios from 'axios';
import PleaseLogin from "../Login/PleaseLogin";

class ManageCategories extends Component {
    constructor() {
        super();

        this.state = {

            tempCategories: [],
            cat_id: '',
            cat_name: ''


        }

    }


    onChangeFn = (event) => {
        this.setState({

            [event.target.name]: event.target.value,

        })


    };


    onClickAddNewFn = (e) => {

        e.preventDefault();


        if (this.state.cat_id === "" && this.state.cat_name === "") {

            alert("Fill all blank fields");

        } else {

            axios.post('http://localhost:5000/category/new/' + this.state.cat_id + '/' + this.state.cat_name)
                .then((response) => {

                    alert('Category Registered successfully!!!')
                    window.location.reload();
                    console.log(response.data);

                }, (error) => {
                    alert('Category not Registered!!!')
                    console.log(error);
                });


        }

    }


    handleDelete(e) {

        console.log("Item to delete: " + e);

        let a = window.confirm("Do you want to delete this item");

        if (a === true) {


            axios.delete('http://localhost:5000/category/remove_category/' + e)
                .then((response) => {

                    alert('Category Deleted successfully!!!');
                    window.location.reload();
                    console.log(response.data);

                }, (error) => {
                    alert('Category not Deleted!!!')
                    console.log(error);
                });


        }

    }

    componentDidMount() {

        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({tempCategories: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (
            (localStorage.getItem("isLoggedin") === "true") && (window.atob(localStorage.getItem("Utype"))) === "Admin" ? (

                <div>
                <div className={"row"}>
                    <div className={"col "}>
                        <div className={"row justify-content-center"} style={{marginTop: "20%"}}>

                            <div className={"col-md-5 "}>

                                <h2 className={"m-3"}>Add new Category</h2>

                                <input
                                    type="text"
                                    id={"cat_id"}
                                    className="form-control"
                                    name={"cat_id"}
                                    placeholder="Id"
                                    required
                                    onChange={(event) => this.onChangeFn(event)}
                                />

                                <br/>

                                <input
                                    type="text"
                                    id={"cat_name"}
                                    className="form-control"
                                    name={"cat_name"}
                                    placeholder="Name"
                                    required
                                    onChange={(event) => this.onChangeFn(event)}
                                />

                                <br/>

                                <button className="btn btn-lg btn-primary btn-block" type={"button"}
                                        onClick={(e) => this.onClickAddNewFn(e)}

                                >
                                    Add New
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className={"col"}>
                        <div className={"row justify-content-center"} style={{marginTop: "5%"}}>

                            <div className={"col-md-9 "}>
                                <h2 className={"m-3"}>Categories list</h2>
                                {
                                    this.state.tempCategories.map((value) => {
                                        return (
                                            <div>
                                                <div className={"row"}>
                                                    <div className={"col"}>
                                                        <h4 className={"list-group-item list-group-item-action list-group-item-dark"}> {value.cat_name} </h4>
                                                    </div>
                                                    <div className={"col"}>
                                                        <button className={"btn btn-danger"}
                                                                onClick={(e) => this.handleDelete(value.cat_name)}>
                                                            Delete
                                                        </button>
                                                    </div>


                                                </div>
                                            </div>


                                        );

                                    })
                                }


                            </div>
                        </div>


                    </div>
                </div>
            </div>

            ) : (


                <PleaseLogin/>


            )
        );
    }


}

export default ManageCategories;