import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Highlights({ featured }) {
    const { breakPoint, data } = featured
    const { _id, img, name, description, price } = data;
    console.log(`This is featured ${featured}`)
    console.log(`This is data ${data}`)
    return (
        <Row className="my-3">
            <Col xs={12} md={breakPoint}>
                <Card style={{ width: '18rem' }} key={_id}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>{description}</Card.Subtitle>
                    <Card.Text>
                    Php {price}
                    </Card.Text>
                    <Button variant="primary" as={Link} to={`/products/${_id}`} exact>Details</Button>
                </Card.Body>
                </Card>
            </Col>
        </Row>
            
    )
}

export default Highlights;