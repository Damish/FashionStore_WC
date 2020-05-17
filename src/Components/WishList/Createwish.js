import React, {Component} from 'react';

import axios from 'axios';


class Createwish extends Component {

    constructor(props) {
        super(props);



        this.state = {
            wish_cusid: '',
            wish_productid: '',
            wish_name: '',
            wish_price: '',
            wish_discount:'',


            products:[

                {

                    wproductid:'P001',
                    wname:'Shirt',
                    wprice:'1000',
                    wdiscount:'10'
                },
                {

                    wproductid:'P002',
                    wname:'Trouser',
                    wprice:'2600',
                    wdiscount:'20'
                },
                {

                    wproductid:'P003',
                    wname:'T-shirt',
                    wprice:'1200',
                    wdiscount:'30'
                }


            ]

        }



    }



        onAddtoWishList(wcid,wpid,wname,wprice,wdiscount){

            console.log(`add to wishlist:`);
            console.log(`wish cusid: `+wcid);
            console.log(`wish productid:`+wpid);
            console.log(`wish name:`+wname);
            console.log(`wish price :`+wprice);
            console.log(`wish price :`+wdiscount);


            const newWish = {

                wish_cusid :wcid ,
                wish_productid:wpid,
                wish_name:wname,
                wish_price:wprice,
                wish_discount: wdiscount
            };

            axios.post('http://localhost:5000/mern/addwish', newWish)
                .then(res => console.log(res.data));

            this.setState({
                wish_cusid : '',
                wish_productid: '',
                wish_name: '',
                wish_price: '',
                wish_discount:''
            })



        }



    render() {
        return (
            <div>
            {
                [...this.state.products].map((value) => {

                        return (
                            <div>

                                <h1>{value.wproductid}</h1>
                                <h1>{value.wname}</h1>
                                <h1>{value.wprice}</h1>
                                <h1>{value.wdiscount}</h1>
                                <button type={"button"}
                                        onClick={()=>this.onAddtoWishList(
                                            localStorage.getItem("token-username"),
                                            value.wname,
                                            value.wname,
                                            value.wprice,
                                            value.wdiscount
                                )}>
                                    Add to Wish List</button>
                            </div>
                        )
                    }
                )
            }
            </div>
        )
    }
}

export default Createwish;