import React from "react";
import {apiURL} from "../../constants";
import imageNotAvailable from '../../assets/images/image_not_available.png';
import './ItemThumbnail.css';


const ItemThumbnail = props => {

    let image = imageNotAvailable;

    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
    }

    return <img src={image}  className="img-thumbnail" alt="itemImage" />

};



export default ItemThumbnail;