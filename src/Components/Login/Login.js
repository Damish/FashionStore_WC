import React, {Component} from 'react';
import './login-css.css'

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


        fetch('http://localhost:5000/api/login/' + this.state.credentials.username + '/' + this.state.credentials.password, {
            method: 'GET',

        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log("User Found status : " + data);

                if (data === true) { //when the inserted credentials are true

///////////////
                    this.props.loginFunc();//fire the login function from TestHome.js

                    fetch('http://localhost:5000/api/get_login_token/' + this.state.credentials.username + '/' + this.state.credentials.password, {
                        method: 'GET',

                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {

                            //save received token from api in local storage
                            localStorage.setItem("token", data.token);
                            localStorage.setItem("isLoggedin", "true");


                            // console.log(data);
                        }).then(() => {

                        token = localStorage.getItem("token").toString();

                    }).then(() => {

                        console.log("token from localStorage: " + token);

                    }).then(() => {


                        let authToken = localStorage.getItem("token");

/////////////////////////////////////////////////////

                        fetch('http://localhost:5000/api/verify_token/', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + authToken
                            }

                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                localStorage.setItem("token-userId", data.authData.user.userId);
                                localStorage.setItem("token-username", data.authData.user.username);
                                localStorage.setItem("token-password", data.authData.user.password);

                            });
/////////////////////////////////////////////////////
                    });

///////////////
                }

            })

    };


    render() {

        return (
            <div>
                <div className={"row"}>
                    <div className={"col"}></div>
                    <div className={"col md-4"}>

                        <h2 className={"m-3 text-center"}>Login</h2>

                        <input
                            type="text"
                            className="form-control"
                            name={"username"}
                            placeholder="Username"
                            onChange={(event) => this.onChangeFn(event)}
                        />

                        <br/>

                        <input
                            type="password"
                            className="form-control"
                            name={"password"}
                            placeholder="Password"
                            onChange={(event) => this.onChangeFn(event)}
                        />

                        <br/>

                        <button className="btn btn-lg btn-primary btn-block" type={"button"}
                                onClick={() => this.onClickFn()}>
                            Log in
                        </button>


                    </div>

                    <div className={"col"}></div>

                </div>


            </div>
        );
    }
}


