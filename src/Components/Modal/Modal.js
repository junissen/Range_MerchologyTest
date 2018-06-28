import React, { Component } from "react";
import "./modal.css";
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery'; 

class Modal extends Component {

    state = {
        modal:  {
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex:"9999",
        },
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
        },
        tag: "",
        location: ""
    }

    submitFunction = () => {
        // Create a unique tag identifer for photo and grab appropriate location from user input
        let tagInput = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
        let locationForm = $('#location').val()
        let locationInput = ""

        if (locationForm === 'Logo on front') {
            locationInput = "front"
        }

        if (locationForm === 'Logo on back') {
            locationInput = "back"
        }

        // set local state of tag and location and then update parent states. Close modal
        this.setState({tag: tagInput}, function () {
            this.props.addImage("tag", this.state.tag)
            this.setState({location: locationInput}, function() {
                this.props.addImage("location", this.state.location)
                this.props.onClose()
            })
        })

    }


    render() {
        return (
            <div>
                {this.props.isOpen ?  
                    <div className="modal-background" style={this.state.background}>
                        <div className="modal-style" style={this.state.modal}>
                            <h1 className="modal-title">Choose an image location</h1>
                            <div className="modal-text">
                                <form>

                                    <div className="form-group">
                                        <label htmlFor="location">Choose image location: </label>
                                        <select className="form-control-location" id="location">
                                        <option>Logo on front</option>
                                        <option>Logo on back</option>
                                        </select>
                                    </div>

                                </form>
                            </div>
                            <button className="modal-btn" onClick={this.submitFunction}>Submit</button>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
    
}

export default Modal;