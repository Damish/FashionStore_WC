import React, {Component} from 'react';
import TestHome, {fakeAuth} from "../Login/TestHome"
import {Link} from "react-router-dom";
import HomeBG from "../AddNewProducts/assets/a1.jpg";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: "",
                password: ""
            },
            loginFunction: this.props.loginFunc
        };
    };

    onChangeFn = (event) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value,
            }
        })
    };


    onClickFn = () => {
        localStorage.setItem("isLoggedin", "false");
        let token = "";

        fetch('http://localhost:5000/users/api/login/' + this.state.credentials.username + '/' + this.state.credentials.password, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("User Found status : " + data.type);

                let enc_Utype = window.btoa(data.type);

                localStorage.setItem('Utype', enc_Utype)//save usertype in local storage

                if (data.type !== null) { //when the inserted credentials are true
///////////////

                    fakeAuth.isAuthenticated = true

                    this.props.loginFunc();//fire the login function from TestHome.js



                    fetch('http://localhost:5000/users/api/get_login_token/' + this.state.credentials.username + '/' + this.state.credentials.password, {
                        method: 'GET',
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            //save received token from api in local storage
                            localStorage.setItem("token", data.token);

                            localStorage.setItem("isLoggedin", "true");

                        }).then(() => {
                        token = localStorage.getItem("token").toString();
                    }).then(() => {
                        console.log("token from localStorage: " + token);
                    }).then(() => {

                        let authToken = localStorage.getItem("token");
/////////////////////////////////////////////////////
                        fetch('http://localhost:5000/users/api/verify_token/', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + authToken
                            }
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {

                                let enc_userID = window.btoa(data.authData.user.userId);
                                let enc_Username = window.btoa(data.authData.user.username);


                                localStorage.setItem("token-userId", enc_userID);
                                localStorage.setItem("token-username", enc_Username);

                            });
/////////////////////////////////////////////////////
                    });
///////////////
                }
            })
    };


    render() {
        return (
            <div style={{backgroundImage: "url(" + HomeBG + ")",backgroundSize:'1680px 1080px', backgroundAttachment:'fixed'}}>
                <div className={"row justify-content-center"} style={{paddingTop: "12%" , height:'800px'}}>
                <div className={"col-md-3"}>

                            <h2 className={"m-2 text-center text-white"}>Fashion Store</h2>
                            <input
                                type="email"
                                className="form-control mt-4 mb-4"
                                name={"username"}
                                placeholder="E-mail/username"
                                onChange={(event) => this.onChangeFn(event)}
                            />

                            <input
                                type="password"
                                className="form-control mt-4 mb-4"
                                name={"password"}
                                placeholder="Password"
                                onChange={(event) => this.onChangeFn(event)}
                            />

                            <button className="btn btn-lg btn-primary btn-block"
                                    type={"button"}
                                    onClick={() => this.onClickFn()}
                                    data-toggle="collapse"
                                    data-target="#collapseExample"
                                    aria-controls="collapseExample"
                            >
                                Log in
                            </button>


                    <label>Dont have account? </label><Link className="text-success" to="/sign-up"> Signup here </Link>



                            {/*{*/}

                            {/*        <div className="collapse" id="collapseExample">*/}
                            {/*            <div className="card card-body text-danger">*/}
                            {/*                <br/>*/}
                            {/*                Invalid e-mail/password*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*}*/}


                        </div>
            </div>
            </div>
        );
    }
}
