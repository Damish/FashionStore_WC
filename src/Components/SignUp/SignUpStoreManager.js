import React, {Component} from 'react';
import axios from 'axios';
import PleaseLogin from "../Login/PleaseLogin";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {

            username: "",
            user_type: "StoreManager",
            password: "",
            password_confirm: "",

            loginFunction: this.props.loginFunc

        };
    };

    onChangeFn = (event) => {
        this.setState({

            [event.target.name]: event.target.value,

        })


    };


    onClickFnSM = (e) => {

        e.preventDefault();


        const email = document.getElementById('username');

        if (!email.validity.valid) {
            if (email.validity.typeMismatch) {

                alert('Entered value needs to be an e-mail address')
                console.log('Entered value needs to be an e-mail address.');
            }
        } else {

            console.log('Valid e-mail address.');


            if (((this.state.password === this.state.password_confirm) && !(this.state.password === ""))) {

                console.log("PASSWORDS MATCH");

                axios.post('http://localhost:5000/api/users/new/' + this.state.username + '/' + this.state.password + '/' + this.state.user_type)
                    .then((response) => {

                        alert('Store Manager Registered successfully!!!')
                        console.log(response.data);

                    }, (error) => {
                        alert('Registration unsuccessfull!!!')
                        console.log(error);
                    });


            } else {

                alert('PASSWORDS DO NOT MATCH!!!')
                console.log("PASSWORDS DO NOT MATCH");

            }

        }


    }

    render() {
        return (

            (localStorage.getItem("isLoggedin") === "true") ? (

            <div className={"row justify-content-center"} style={{marginTop: "10%"}}>

                <div className={"col-md-3"}>

                    <h2 className={"m-3 text-center"}>Register Store Manager</h2>

                    <input
                        type="email"
                        className="form-control mt-4"
                        name={"username"}
                        id={"username"}
                        placeholder="Username"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />

                    <br/>

                    <input
                        type="password"
                        className="form-control"
                        name={"password"}
                        placeholder="Password"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />

                    <br/>

                    <input
                        type="password"
                        className="form-control"
                        name={"password_confirm"}
                        placeholder="Confirm Password"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />


                    <br/>

                    <button className="btn btn-lg btn-primary btn-block" type={"button"}
                            onClick={(e) => this.onClickFnSM(e)}>
                        Sign up
                    </button>


                </div>

            </div>

            ):(


                <PleaseLogin/>


            )
        );
    }
}

export default SignUp;