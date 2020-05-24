import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import HomeBG from "../AddNewProducts/assets/a1.jpg";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {

            username: "",
            user_type: "User",
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


    onClickFn = (e) => {

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

                axios.post('http://localhost:5000/users/new/' + this.state.username + '/' + this.state.password + '/' + this.state.user_type)
                    .then((response) => {

                        alert('User Registered successfully!!!')
                        console.log(response.data);

                    }, (error) => {
                        alert('Registration unsuccessful!!!')
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

            <div style={{backgroundImage: "url(" + HomeBG + ")",backgroundSize:'1680px 1080px', backgroundAttachment:'fixed'}}>
            <div className={"row justify-content-center"} style={{paddingTop: "12%" , height:'800px'}}>

                <div className={"col-md-3"}>


                    <h2 className={"m-3 text-center text-white "}>Sign up</h2>

                    <input
                        type="email"
                        className="form-control mt-4 "
                        name={"username"}
                        id={"username"}
                        placeholder="Username"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />

                    <br/>

                    <input
                        type="password"
                        id={"password"}
                        className="form-control"
                        name={"password"}
                        placeholder="Password"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />

                    <br/>

                    <input
                        type="password"
                        id={"password_confirm"}
                        className="form-control"
                        name={"password_confirm"}
                        placeholder="Confirm Password"
                        required
                        onChange={(event) => this.onChangeFn(event)}
                    />

                    <br/>

                    <button className="btn btn-lg btn-success btn-block" type={"button"}
                            onClick={(e) => this.onClickFn(e)}

                    >
                        Sign up
                    </button>

                    <label>Already have account? </label><Link className="text-primary" to="/login"> Login here </Link>

                </div>

            </div>
            </div>
        );
    }
}

export default SignUp;