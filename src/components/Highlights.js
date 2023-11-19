import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Highlights({ data }) {
    const { _id, name, price, img } = data;

    return (
        <>
            <Col xs={12} md={5} lg={2} className="mx-auto">
                <Card style={{ width: '18rem' }} key={_id}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Php {price}</Card.Text>
                    <Button variant="primary" as={Link} to={`/products/${_id}`} exact>Details</Button>
                </Card.Body>
                </Card>
            </Col>
        </>    
    )
}

export default Highlights;