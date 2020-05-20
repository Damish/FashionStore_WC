import React, {Component} from 'react';
import CommentItem from "./CommentItem";
import axios from "axios";
import BeautyStars from "beauty-stars";


class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            comment:[],
            avgComm:'',
            value: '',
        };
    }

    componentDidMount() {

        let productId = this.props.prodid;

        axios.get('http://localhost:5000/mern/findcomment/' + productId)
            .then(response => {
                console.log(response);
                this.setState({ comment: response.data });
                this.getavgcomment();
            })
            .catch(function (error){
                console.log(error);
            })
    }

    getavgcomment(){
       var  tot =0;
        for (var i =0;i<this.state.comment.length;i++){
            tot += this.state.comment[i].rating;
        }
        console.log(tot);
        this.setState({ avgComm: tot/this.state.comment.length });
        console.log(this.state.avgComm);


    }

    render() {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"Row"}>
                    <div className={"col-md-6"}>
                    <p>Average Rating:</p>
                    </div>
                    <div className={"col-md-6"}>
                    <BeautyStars
                        value={this.state.avgComm}
                    />
                    </div>
                    </div>
                </div>
                <br/>
                <br/>
                  <div>

                        {

                            this.state.comment.map((value, index) => {

                                return(
                                    <div>

                                        <CommentItem
                                            comment_userId={value.userId}
                                           comment_body={value.commentBody}
                                           comment_rating={value.rating}
                                        />

                                    </div>
                                )


                            })

                        }
                  </div>


                        <br/>
                        <br/>
                        <br/>



                </div>


        );
    }
}

export default CommentList;