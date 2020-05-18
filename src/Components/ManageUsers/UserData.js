import React, {Component} from 'react';
import axios from "axios";

class UserData extends Component {



    onRemoveUser(id_toDelete) {

        axios.delete('http://localhost:5000/users/removeUser/'+ id_toDelete)
            .then((response) => {
                // console.log(response.data);
            }, (error) => {
                console.log(error);
            });
        window.location.reload();
    }



    render() {
        return (
            <div className={"row justify-content-center"}>
                <div className={" col-md-6"}>

                    <div className="card m-2 ">
                        <div className="card-body">
                            <div className="row">

                                <div className={"col"}>
                                    <h4> {this.props.no}</h4>
                                </div>

                                <div className={"col"}>
                                    <h4> {this.props.name}</h4>
                                </div>

                                <div className="col">
                                    <button type="button" className="btn btn-danger"  onClick={()=>this.onRemoveUser( this.props.id )}>
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

export default UserData;