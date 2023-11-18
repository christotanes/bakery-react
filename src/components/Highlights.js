import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Highlights({ activeProducts }) {

    
    
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