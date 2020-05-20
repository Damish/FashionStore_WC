import React, {Component} from 'react';
import StoreManagerData from "./StoreManagerData"
import axios from "axios";
import PleaseLogin from "../Login/PleaseLogin";
import UserData from "../ManageUsers/UserData";

class StoreManagersList extends Component {

    constructor(props) {
        super(props);
        this.state = {storeManagers: []};
    }

    componentDidMount() {

        console.log("ComponentDidMount:::StoreManagersList>>>>>>>s")

        axios.get('http://localhost:5000/users/StoreManager')
            .then(response => {
                this.setState({storeManagers: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (

            (localStorage.getItem("isLoggedin") === "true") && (window.atob(localStorage.getItem("Utype"))) === "Admin" ? (

                <div>

                    <h1>Store Managers</h1>
                    {
                        this.state.storeManagers.map((value,index) => {
                            return (
                                <div>
                                    <StoreManagerData
                                        no={index+1}
                                        id ={value._id}
                                        name={value.username}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

            ) : (


                <PleaseLogin/>


            )

        );
    }
}

export default StoreManagersList;