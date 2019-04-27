import React from 'react';
import ArtistThumbnail from "../ItemThumbnail/ItemThumbnail";
import {Card, CardBody} from "reactstrap";

const ItemsList = props => {
    return (
        <Card className="my-5" onClick={props.click}>
            <CardBody>
                <ArtistThumbnail image={props.image}/>
                <strong className="ml-5">
                    {props.item}
                </strong>
                <p>{props.price}</p>
            </CardBody>
        </Card>
    );
};

export default ItemsList;