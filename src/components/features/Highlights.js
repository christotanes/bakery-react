import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Highlights({ data }) {
    const { _id, name, price, img } = data;

    return (
        <>
            <Col xs={12} md={5} lg={2} className="ms-3 mb-3">
                <Card style={{ width: '12rem' }} key={_id}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <h5 className="text-end text-danger border-bottom mb-3">₱ {price}</h5>
                    <Button variant="primary" as={Link} to={`/products/${_id}`}>Details</Button>
                </Card.Body>
                </Card>
            </Col>
        </>    
    )
}

export default Highlights;