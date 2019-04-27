import React from 'react';
import {Card, CardText, CardTitle} from "reactstrap";

import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";

const OneItem = props => {
    return (
            <Card className="mx-3">
                <CardTitle>{props.item}</CardTitle>
                <ItemThumbnail image={props.image}/>
                <p><strong>{props.price}</strong></p>
                <CardText>{props.description}</CardText>
                <p>Author: {props.username}</p>
                <p>mob: {props.number}</p>
                <button onClick={props.onClick}>Sold</button>
            </Card>
    );
};

export default OneItem;