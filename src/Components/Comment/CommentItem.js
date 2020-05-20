import React, {Component} from 'react';
import BeautyStars from "beauty-stars";

class CommentItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-xs-2 col-md-1">
                            <img src="http://placehold.it/80" className="img-circle img-responsive" alt=""/></div>
                        <div className="col-xs-10 col-md-11">
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