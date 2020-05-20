import React, {Component} from 'react';
import axios from "axios";
import PleaseLogin from "../Login/PleaseLogin";

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.onChangecheckfullname = this.onChangecheckfullname.bind(this);
        this.onChangecheckemail = this.onChangecheckemail.bind(this);
        this.onChangecheckaddress = this.onChangecheckaddress.bind(this);
        this.onChangecheckcity = this.onChangecheckcity.bind(this);
        this.onChangecheckstate = this.onChangecheckstate.bind(this);
        this. onChangecheckzip = this. onChangecheckzip.bind(this);
        this. onChangecheckcardtype = this. onChangecheckcardtype.bind(this);
        this.onChangecheckcardname = this.onChangecheckcardname.bind(this);
        this.onChangecheckcardnumber = this.onChangecheckcardnumber.bind(this);
        this.onChangecheckexpmonth = this.onChangecheckexpmonth.bind(this);
        this.onChangecheckexpyear = this.onChangecheckexpyear.bind(this);
        this.onChangecheckcvv = this.onChangecheckcvv.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            check_fullname: '',
            check_email: '',
            check_address: '',
            check_city: '',
            check_state: '',
            check_zip: '',
            check_cardtype: '',
            check_cardname: '',
            check_cardnumber:'',
            check_expmonth: '',
            check_expyear: '',
            check_cvv: '',
            total:localStorage.getItem("total")


        }
    }
    onChangecheckfullname(e) {
        this.setState({
            check_fullname: e.target.value
        });
    }
    onChangecheckemail(e) {
        this.setState({
            check_email: e.target.value
        });
    }
    onChangecheckaddress(e) {
        this.setState({
            check_address: e.target.value
        });
    }
    onChangecheckcity(e) {
        this.setState({
            check_city: e.target.value
        });
    }
    onChangecheckstate(e) {
        this.setState({
            check_state: e.target.value
        });
    }
    onChangecheckzip(e) {
        this.setState({
            check_zip: e.target.value
        });
    }
    onChangecheckcardtype(e) {
        this.setState({
            check_cardtype: e.target.value
        });
    }
    onChangecheckcardname(e) {
        this.setState({
            check_cardname: e.target.value
        });
    }
    onChangecheckcardnumber(e) {
        this.setState({
            check_cardnumber: e.target.value
        });
    }

    onChangecheckexpmonth(e) {
        this.setState({
            check_expmonth: e.target.value
        });
    }
    onChangecheckexpyear(e) {
        this.setState({
            check_expyear: e.target.value
        });
    }
    onChangecheckcvv(e) {
        this.setState({
            check_cvv: e.target.value
        });

    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`full name: ${this.state.check_fullname}`);
        console.log(`Todo Responsible: ${this.state.check_email}`);
        console.log(`Todo Priority: ${this.state.check_address}`);
        console.log(`Todo Priority: ${this.state.check_city}`);

        console.log(`Todo Priority: ${this.state.check_state}`);
        console.log(`Todo Priority: ${this.state.check_zip}`);

        console.log(`Todo Priority: ${this.state.check_cardtype}`);
        console.log(`Todo Priority: ${this.state.check_cardname}`);
        console.log(`Todo Priority: ${this.state.check_cardnumber}`);

        console.log(`Todo Priority: ${this.state.check_expmonth}`);
        console.log(`Todo Priority: ${this.state.check_expyear}`);
        console.log(`Todo Priority: ${this.state.check_cvv}`);
        console.log( `Todo Priority: ${this.state.total}`);


        const checkouti  = {
            pay_fullname: this.state.check_fullname,
            pay_email: this.state.check_email,
            pay_address:  this.state.check_address,
            pay_city:  this.state.check_city,
            pay_state:  this.state.check_state,
            pay_zip:  this.state.check_zip,
            pay_cardtype:  this.state.check_cardtype,
            pay_cardname:  this.state.check_cardname,
            pay_cardnumber: this.state.check_cardnumber,
            pay_expmonth:  this.state.check_expmonth,
            pay_expyr:  this.state.check_expyear,
            pay_cvv:  this.state.check_cvv,
            pay_total:  this.state.total,
            pay_userid: window.atob(localStorage.getItem("token-username")) ,

        };

        axios.post('http://localhost:5000/shop/addtocheckout', checkouti)
            .then(res => console.log(res.data));


        this.setState({
            check_fullname: '',
            check_email: '',
            check_address: '',
            check_city: '',
            check_state: '',
            check_zip: '',
            check_cardtype: '',
            check_cardname: '',
            check_cardnumber:'',
            check_expmonth: '',
            check_expyear: '',
            check_cvv: ''


        })
    }
    render() {
        return (
            (localStorage.getItem("isLoggedin") === "true") ? (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="card">
                        <h1>Checkout form</h1>
                        <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing
                            responsive, mobile-first projects on the web.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">


                            <h1>Billing Address</h1>
                            <p>Full Name :</p>
                            <input className="form-control input-sm"
                                   type="text"

                                   value={this.state.check_fullname}
                                   onChange={this.onChangecheckfullname}
                                   required
                            />

                            <p>Email Address:</p>
                            <input className="form-control input-sm"
                                   type="text"
                                   value={this.state.check_email}
                                   onChange={this.onChangecheckemail}
                                   required
                            />

                            <p>Address:</p>
                            <input className="form-control input-sm"
                                   type="text"
                                   value={this.state.check_address}
                                   onChange={this.onChangecheckaddress}
                                   required
                            />
                            <p>City:</p>
                            <input className="form-control input-sm"
                                   type="text"
                                   value={this.state.check_city}
                                   onChange={this.onChangecheckcity}
                                   required
                            />
                            <div className="row">
                                <div className={"col-md-6"}>
                                    <p>State:</p>
                                    <input className="form-control input-sm"
                                           type="text"
                                           value={this.state.check_state}
                                           onChange={this.onChangecheckstate}
                                           required
                                    />
                                </div>
                                <div className={"col-md-6"}>
                                    <p>Zip:</p>
                                    <input className="form-control input-sm"
                                           type="text"
                                           value={this.state.check_zip}
                                           onChange={this.onChangecheckzip}
                                           required
                                    />
                                </div>
                            </div>


                        </div>


                        <div className="col-md-6">

                            <h1> Payment </h1>
                            <div className="form-group">
                                <p>Accepted Cards:</p>

                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input"
                                            type="radio"
                                            name="priorityOptions"
                                            id="prioritycredit"
                                            value="credit"
                                            checked={this.state.check_cardtype==='credit'}
                                            onChange={this.onChangecheckcardtype}
                                            required
                                    />
                                    <label className="form-check-label">Credit card</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input"
                                            type="radio"
                                            name="priorityOptions"
                                            id="prioritydebit"
                                            value="debit"
                                            checked={this.state.check_cardtype==='debit'}
                                            onChange={this.onChangecheckcardtype}

                                    />
                                    <label className="form-check-label">Debit card</label>
                                </div>
                            </div>
                            <div className="form-group">

                                <p>Name on Card:</p>
                                <input className="form-control input-sm"
                                       type="text"
                                       value={this.state.check_cardname}
                                       onChange={this.onChangecheckcardname}
                                       required

                                />
                                <p>Credit card number:</p>
                                <input className="form-control input-sm"
                                       type="number"
                                       value={this.state.check_cardnumber}
                                       onChange={this.onChangecheckcardnumber}
                                       required
                                />
                                <p>Exp Month:</p>
                                <input className="form-control input-sm"
                                       type="text"
                                       value={this.state.check_expmonth}
                                       onChange={this.onChangecheckexpmonth}
                                       required
                                />
                                <div className="row">
                                    <div className={"col-md-6"}>
                                        <p>Exp year:</p>
                                        <input className="form-control input-sm"
                                               type="number"
                                               value={this.state.check_expyear}
                                               onChange={this.onChangecheckexpyear}
                                               required
                                        />
                                    </div>
                                    <div className={"col-md-6"}>
                                        <p>CVV:</p>
                                        <input className="form-control input-sm"
                                               type=""
                                               value={this.state.check_cvv}
                                               onChange={this.onChangecheckcvv}
                                               required
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row mt-5">
                            <div className="col md-12">
                                <input type="submit" value="continue checkout" className="btn btn-primary btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) : (


            <PleaseLogin/>


        )


        );
    }
}

export default Checkout;