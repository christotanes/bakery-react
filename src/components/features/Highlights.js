import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LazyLoad } from "../../common/util/LazyLoad";

function Highlights({ data, key }) {
    const { _id, name, price, img, imgLqip } = data;
    console.log(`This is img: ${img}`)
    console.log(`This is imgLqip: ${imgLqip}`)

    return (
        <>
            <Col xs={12} md={5} lg={2} className="ms-3 mb-3" key={key}>
                <Card style={{ width: '12rem', textDecoration: 'none' }} key={_id} className="shadow-lg" as={Link} to={`/products/${_id}`}>
                <LazyLoad image={img} imageLqip={imgLqip} alt={name} width={`100%`} height={`100%`}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <h5 className="text-end text-danger border-bottom mb-3">₱ {price}</h5>
                    {/* <Button variant="primary" as={Link} to={`/products/${_id}`}>Details</Button> */}
                </Card.Body>
                </Card>
            </Col>
        </>    
    )
}

export default Highlights;