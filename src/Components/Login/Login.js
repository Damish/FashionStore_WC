import React, {Component} from 'react';
import './login-css.css'


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username : "",
                password : ""
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

        if (this.state.credentials.username === "admin" && this.state.credentials.password === "123") {

            this.setState({
                ...this.state.loginFunction
            }, this.props.loginFunc)

        }

        console.log(this.state.credentials);

    };


    render() {


        return (
            <div>


                <div className={"row"}>
                    <div className={"col"}></div>
                    <div className={"col md-4"}>

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


