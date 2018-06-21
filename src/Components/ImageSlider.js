import React, { Component } from "react";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import $ from "jquery";
import "./SliderFunction.js" ;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.css';
import "./ImageSlider.css";
import axios from "axios";
import Modal from "./Modal/Modal.js";


class ImageSlider extends Component {

    state = {
        gallery: [],
        logosrc: "",
        location: "",
        tag: "",
        isModalOpen: false,
        frontWidth: 0,
        backWidth: 0
    }

    componentDidMount = () => {
        let frontLogoWidth = Math.floor($('.logo-div-front').width())
        let backLogoWidth = Math.floor($('.logo-div-back').width()) 
        this.setState({frontWidth: frontLogoWidth})
        this.setState({backWidth: backLogoWidth})
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillMount = () => {
        this.updateDimensions()
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions)
    }

    updateDimensions = () => {
        let frontLogoWidth = Math.floor($('.logo-div-front').width())
        let backLogoWidth = Math.floor($('.logo-div-back').width()) 
        this.setState({frontWidth: frontLogoWidth}, function(){
            this.setState({backWidth: backLogoWidth}, function(){
                this.loadImage()
            })
        })
    }

    openModal = () => {
        this.setState({isModalOpen: true})
    }

    closeModal = () => {
        this.setState({isModalOpen: false})
        console.log("IMAGE TAG")
        console.log(this.state.tag)
        this.uploadWidget()
        
    }

    uploadWidget = () => {
        let self = this
        window.cloudinary.openUploadWidget({ cloud_name: 'djadqbynq', upload_preset: 'jctyccsn', tags:[self.state.tag]},
            function(error, result) {
                console.log(result);

                if (result) {
                    console.log("RESULT")  
                    self.loadImage() 
                }
            });
    }

    loadImage = () => {
        this.setState({gallery: []})
        let searchString = 'https://res.cloudinary.com/djadqbynq/image/list/' + this.state.tag + '.json'
        console.log(searchString)
        axios.get(searchString)
        .then(res => {
            console.log(res.data.resources);
            this.setState({gallery: res.data.resources});
        });
    }

    componentChange = (field, value) => {
        this.setState({[field]: value})
    }

    render() {
        return (

            <div>

            <div className="row">

                <div className="col-3">
                </div>

                <div className="col-6 productColumn">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-slider">
                                <div className="product-front">
                                    <div className="image-div">
                                        <img className="product-image" src="//cdn.shopify.com/s/files/1/0312/6537/products/363807_black_flat_front_1024x1024_f490593a-c7cc-42cc-b864-f5b16b585057_1024x1024.jpg?v=1494271591" alt="Nike Men's Black Dri-FIT S/S Micro Pique Polo Front"/>
                                        <div className="logo-div-front">
                                            { this.state.location === 'front' ?
                                                <div className="logo">
                                                <CloudinaryContext cloudName="djadqbynq">
                                                    {
                                                        this.state.gallery.map(data => {
                                                            return (
                                                                <div className="responsive" key={data.public_id}>
                                                                    <div className="img">
                                                                        <a target="_blank" href={`https://res.cloudinary.com/djadqbynq/image/upload/${data.public_id}.jpg`}>
                                                                            <Image publicId={data.public_id}>
                                                                                <Transformation
                                                                                    crop="scale"
                                                                                    width={this.state.frontWidth}
                                                                                    height={this.state.frontWidth}
                                                                                    dpr="auto"
                                                                                    responsive_placeholder="blank"
                                                                                />
                                                                            </Image>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </CloudinaryContext>
                                                <div className="clearfix"></div>
                                            </div>
                                            : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="product-back">
                                    <div className="image-div">
                                        <img className="product-image" src="//cdn.shopify.com/s/files/1/0312/6537/products/363807_Black_5_1024x1024.jpg?v=1494271591" alt="Nike Men's Black Dri-FIT S/S Micro Pique Polo Back" />
                                        <div className="logo-div-back">
                                        { this.state.location === 'back' ?
                                                <div className="logo">
                                                <CloudinaryContext cloudName="djadqbynq">
                                                    {
                                                        this.state.gallery.map(data => {
                                                            return (
                                                                <div className="responsive" key={data.public_id}>
                                                                    <div className="img">
                                                                        <a target="_blank" href={`https://res.cloudinary.com/djadqbynq/image/upload/${data.public_id}.jpg`}>
                                                                            <Image publicId={data.public_id}>
                                                                                <Transformation
                                                                                    crop="scale"
                                                                                    width={this.state.backWidth}
                                                                                    height={this.state.backWidth}
                                                                                    dpr="auto"
                                                                                    responsive_placeholder="blank"
                                                                                />
                                                                            </Image>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </CloudinaryContext>
                                                <div className="clearfix"></div>
                                            </div>
                                            : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="upload-button" onClick={this.openModal}>Upload</button>
                        </div>
                    </div>


                </div>

                <div className="col-3">
                </div>


            
            </div>

            

            <Modal isOpen={this.state.isModalOpen} onClose={()=>this.closeModal()} addImage={this.componentChange.bind(this)}></Modal>

            </div>
        )
    }
}

export default ImageSlider