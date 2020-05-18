import React, {Component} from 'react';
import StoreManagerData from "./StoreManagerData"
import axios from "axios";
import PleaseLogin from "../Login/PleaseLogin";

class StoreManagersList extends Component {

    constructor(props) {
        super(props);
        this.state = {storeManagers: []};
    }

    componentDidMount() {

        console.log("ComponentDidMount:::StoreManagersList>>>>>>>s")

        axios.get('http://localhost:5000/users/get_all_SM')
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

                <div className={"container"}>

                    <h1>Store Managers</h1>
                    {
                        this.state.storeManagers.map((value) => {
                            return (
                                <div>
                                    <StoreManagerData
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