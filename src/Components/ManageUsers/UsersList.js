import React, {Component} from 'react';
import UserData from "./UserData"
import axios from "axios";
import PleaseLogin from "../Login/PleaseLogin";
import HomeBG from "../AddNewProducts/assets/a1.jpg";

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {

        console.log("ComponentDidMount:::UsersList>>>>>>>s")

        axios.get('http://localhost:5000/users/User')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (

            (localStorage.getItem("isLoggedin") === "true") && (window.atob(localStorage.getItem("Utype"))) === "Admin" ? (
                <div style={{backgroundImage: "url(" + HomeBG + ")",backgroundSize:'1680px 1080px', backgroundAttachment:'fixed'}}>
                <div className={"container bg-dark"}style={{ height:'800px',opacity:0.8}}>

                    <h1 className={"text-white"}>Users List</h1>
                    {
                        this.state.users.map((value,index) => {
                            return (
                                <div>
                                    <UserData
                                        no={index+1}
                                        id={value._id}
                                        name={value.username}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            ) : (


                <PleaseLogin/>


            )

        );
    }
}

export default UsersList;