import React from 'react';
import {Card, CardText, CardTitle, Col} from "reactstrap";

import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import Row from "reactstrap/es/Row";

const OneItem = props => {
    return (
        <Row>
            <Col xs="6">
                <Card className="mx-3">
                    <CardTitle className="p-3"><strong>{props.item}</strong></CardTitle>
                    <ItemThumbnail image={props.image}/>
                    <p className="px-3"><strong>Price: {props.price} som</strong></p>
                    <CardText className="px-3">Description: {props.description}</CardText>
                    <p className="px-3">Author: {props.username}</p>
                    <p className="px-3">mob: {props.number}</p>

                </Card>
            </Col>
        </Row>
    );
};

export default OneItem;