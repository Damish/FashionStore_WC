import React, {Component} from 'react';
import BeautyStars from "beauty-stars";
import CommentImage from './useritemcomment.png';


class CommentItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-xs-2 col-md-4">
                            <img style={{width: '40%', height:'90%'}} src={CommentImage} className="img-circle img-responsive" alt=""/>
                        </div>
                        <div className="col-xs-10 col-md-5">
                            <div>

                                <div className="mic-info">
                                    By: <a href="#">{this.props.comment_userId}</a>
                                </div>
                            </div>
                            <div className="comment-text">
                                {this.props.comment_body}
                            </div>
                            <div>
                            <BeautyStars
                                value={this.props.comment_rating}
                            />
                            </div>

                        </div>
                    </div>
                </li>


            </div>
        );
    }
}

export default CommentItem;