import React, {Component} from 'react';
import Wishitem from "./Wishitem";
import axios from 'axios';

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state ={mern:[]};
        this.state.customerId="";
    }

    componentDidMount() {

        let cus_id= localStorage.getItem("token-username");

        axios.get('http://localhost:5000/mern/' + cus_id)
            .then(response => {
                this.setState({ mern: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        return (
            < div class="Container mt-5">
                <div className="card mb-5 ">
                    <h1 className="text-center">WishList</h1>
                </div>



                <div>

                    {

                        this.state.mern.map((value, index) => {

                            return(
                                <div>

                                    <Wishitem
                                        wi_pid={value.wish_productid}
                                        wi_name={value.wish_name}
                                        wi_price={value.wish_price}
                                        wi_discount={value.wish_discount}
                                    />

                                </div>
                            )


                        })

                    }


                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }


}

export default WishList;
