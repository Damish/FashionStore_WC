import React, {Component} from 'react';
import axios from 'axios';

class Wishitem extends Component {

    constructor(props) {
        super(props);
    //mangi things
    this.state={
        shop_custid: '',
        shop_productid: '',
        shop_proname: '',
        shop_proprice: '',
        shop_prodiscount: '',
        imageData:''

    }

    //mangi things end
    }


    onRemoveItem(pid_todelete) {

        console.log("Item to remove : " + pid_todelete);

        // /removeWishItem/:cid/:pid


        axios.delete('http://localhost:5000/mern/removeWishItem/'+ window.atob(localStorage.getItem("token-username") )+'/'+ pid_todelete)
            .then((response) => {

                console.log(response.data);

            }, (error) => {
                console.log(error);
            });

        window.location.reload();

    }

    //mangi things

    onAddtoshoppingcart(scid,spid,sname,sprice,sdiscount){

        console.log(`added to shoppinglist:`);
        console.log(`wish custid: `+scid);
        console.log(`wish productid:`+spid);
        console.log(`wish name:`+sname);
        console.log(`wish price :`+sprice);
        console.log(`wish discount :`+sdiscount);

        const newshopi = {
            shop_custid:scid ,
            shop_productid:spid,
            shop_proname:sname,
            shop_proprice:sprice,
            shop_prodiscount:sdiscount
        };
        axios.post('http://localhost:5000/shop/addshopping', newshopi)
            .then(res => console.log(res.data));







        this.onRemoveItem(spid);

        this.setState({
            shop_custid:'' ,
            shop_productid:'',
            shop_proname:'',
            shop_proprice:'',
            shop_prodiscount:''
        })

        window.location.reload();

    }


    //manji things end

    componentDidMount() {
        this.getProductList();
    }


    getProductList() {
        axios.get('http://localhost:5000/products/'+ this.props.wi_pid)
            .then(response => {
               this.setState({

                   imageData:response.data.imageData
               })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (

            <div class="card" >
                <div className="card-body">
                    <div class="row">
                        <div class="col">

                                <div className="card mr-3">
                                    <div className="card-body">
                                        <img src={this.state.imageData} className={"container"}/>
                                    </div>
                                </div>

                        </div>
                        <div class="col">

                            {this.props.wi_name}
                        </div>
                        <div className="col">
                            {this.props.wi_price}
                        </div>
                        <div className="col">
                          <span>-</span>
                          <span>{this.props.wi_discount}</span>
                          <span>%</span>

                        </div>

                        <div class="col">
                            <button type="button" className="btn btn-warning"
                                    onClick={()=>this.onAddtoshoppingcart(
                                        window.atob(localStorage.getItem("token-username")),
                                        this.props.wi_pid,
                                        this.props.wi_name,
                                        this.props.wi_price,
                                        this.props.wi_discount
                                    )}>

                                                 Add to ShoppingCart</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger"

                                    onClick={()=>this.onRemoveItem( this.props.wi_pid )}>
                                cancel</button>
                        </div>
                    </div>
                </div>

            </div>


        );
    }


}

export default Wishitem;