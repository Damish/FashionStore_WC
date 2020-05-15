import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {

            username: "",
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

        if ((this.state.password === this.state.password_confirm) || (this.state.password === "")) {

            console.log("PASSWORDS MATCH");

            axios.post('http://localhost:5000/api/users/new/' + this.state.username + '/' + this.state.password)
                .then((response) => {

                    console.log(response.data);

                }, (error) => {
                    console.log(error);
                });


        } else {

            console.log("PASSWORDS DO NOT MATCH");

        }

    }

    render() {
        return (
            <div>

                <div className={"row"}>
                    <div className={"col"}></div>
                    <div className={"col md-4"}>

                        <h2 className={"m-3 text-center"}>Sign up</h2>

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

                        <input
                            type="password"
                            className="form-control"
                            name={"password_confirm"}
                            placeholder="Confirm Password"
                            onChange={(event) => this.onChangeFn(event)}
                        />

                        <br/>

                        <button className="btn btn-lg btn-primary btn-block" type={"button"}
                                onClick={(e) => this.onClickFn(e)}>
                            Sign up
                        </button>


                    </div>

                    <div className={"col"}></div>

                </div>


            </div>
        );
    }
}

export default SignUp;