import React, {Component} from 'react';
import axios from 'axios';

class Shoppingitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 1,
            tot: this.props.s_price,
            lasttot:0,
            imageData:''

        }
    }

    componentDidMount() {
        this.totalinit(this.state.score);
        this.getProductList();
    }



    getProductList() {
        axios.get('http://localhost:5000/products/'+ this.props.s_pid)
            .then(response => {
                this.setState({

                    imageData:response.data.imageData
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    incrementScore = (e) => {
        this.setState({
            score: (this.state.score + 1)
        })
        console.log(this.state.score + 1);
        this.total(this.state.score + 1);
    }

    decrementScore = (e) => {
        if ((this.state.score - 1) > 0 && this.state.score != 0) {
            this.setState({
                score: (this.state.score - 1),

            })
            console.log(this.state.score)
            this.total(this.state.score - 1)

        }
    }

    total = (qty) => {

        var dis = 100 - this.props.s_discount;
        var netPrice = Number((this.props.s_price * (dis / 100)).toFixed(2));
        this.state.lasttot = this.state.tot;
        this.setState({

            tot: netPrice * qty,
        });
        if (localStorage.getItem("total")){
            var a =  parseInt(localStorage.getItem("total"));
            a=a-this.state.lasttot;
            localStorage.setItem("total",a+(netPrice * qty));
            this.props.onBilltotChange();
        }else {
            localStorage.setItem("total",(netPrice * qty));
            this.props.onBilltotChange();
        }
    };

    totalinit = (qty) => {

        var dis = 100 - this.props.s_discount;
        var netPrice = Number((this.props.s_price * (dis / 100)).toFixed(2));
        this.state.lasttot = this.state.tot;
        this.setState({

            tot: netPrice * qty,
        });
        if (localStorage.getItem("total")){
            var a =  parseInt(localStorage.getItem("total"));
            localStorage.setItem("total",a+(netPrice * qty));
            this.props.onBilltotChange();
        }else {
            localStorage.setItem("total",(netPrice * qty));
            this.props.onBilltotChange();
        }


    };

    //delete specific item in shoppingcart

    onRemoveSpecificshoppingItem(pid_todelete) {

        console.log("Item to remove : " + pid_todelete);

        // /removeWishItem/:cid/:pid


        axios.delete('http://localhost:5000/shop/removeShopItem/' + window.atob(localStorage.getItem("token-username")) + '/' + pid_todelete)
            .then((response) => {

                console.log(response.data);

            }, (error) => {
                console.log(error);
            });

        window.location.reload();

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="card mr-3">
                                <div className="card-body">
                                    <img src={this.state.imageData} className={"container"}/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            {this.props.s_name}
                        </div>
                        <div className="col">
                            {this.props.s_price}
                        </div>
                        <div className="col">
                            <span>-</span>
                            <span>{this.props.s_discount}</span>
                            <span>%</span>
                        </div>

                        <div className="col">
                            {/*<div className="qty mt-1">*/}
                            {/*    <span className="minus bg-dark">-</span>*/}
                            {/*    <input type="number" className="count" name="qty" value="1"/>*/}
                            {/*    <span className="plus bg-dark">+</span>*/}
                            {/*</div>*/}
                            <div className="counter">
                                <button className="counter-action decrement" onClick={this.decrementScore}> -</button>
                                <div className="counter-score"> {this.state.score} </div>
                                <button className="counter-action increment" onClick={this.incrementScore}> +</button>
                            </div>

                        </div>
                        <div className="col">
                            {this.state.tot}
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-outline-primary"
                                    onClick={() => this.onRemoveSpecificshoppingItem(this.props.s_pid)}>Remove
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Shoppingitem;