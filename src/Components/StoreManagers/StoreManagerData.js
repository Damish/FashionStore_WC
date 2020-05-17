import React, {Component} from 'react';

class StoreManagerData extends Component {
    render() {
        return (
            <div className={"row justify-content-center"}>
                <div className={" col-md-6"}>

                    <div className="card m-2 ">
                        <div className="card-body">
                            <div className="row">

                                <div className={"col"}>
                                    <h4> {this.props.name}</h4>
                                </div>

                                <div className="col">
                                    <button type="button" className="btn btn-danger">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default StoreManagerData;