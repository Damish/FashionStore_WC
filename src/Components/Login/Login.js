import React, {Component} from 'react';
import './login-css.css'


class Login extends Component {
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <h1 className="text-center login-title">Sign in to continue to My Fashion Store</h1>
                            <div className="account-wall">
                                <img className="profile-img"
                                     src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                     alt=""></img>
                                    <form className="form-signin">
                                        <input type="text" className="form-control" placeholder="Email" required
                                               autoFocus></input>
                                            <input type="password" className="form-control" placeholder="Password"
                                                   required></input>
                                                <button className="btn btn-lg btn-primary btn-block" type="submit">
                                                    Sign in
                                                </button>
                                                <label className="checkbox pull-left">
                                                    <input type="checkbox" value="remember-me"></input>
                                                        Remember me
                                                </label>
                                                <a href="www.google.com" className="pull-right need-help">Need help? </a><span
                                                className="clearfix"></span>
                                    </form>
                            </div>
                            <a href="www.google.com" className="text-center new-account">Create an account </a>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Login;