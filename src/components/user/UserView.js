import { Card, Button, Row, Col, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewCart from "./ViewCart";

function UserView({ activeProducts }) {
    const activeProductCols = activeProducts.map((product) => (
        <Col xs={12} md="auto" key={product._id} className="my-3 mx-auto">
            <Card style={{ width: '18rem' }} className="shadow-lg">
                <Card.Img variant="top" src={product.img} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>{product.description}</Card.Subtitle>
                    <Card.Text>Php {product.price}</Card.Text>
                    <Button variant="primary" as={Link} to={`/products/${product._id}`}>Details</Button>
                </Card.Body>
            </Card>
        </Col>
    ))

    return (
        <>  
            <Row>
                <Col className="mb-auto my-3 mx-auto d-flex justify-content-center"><h4>Categories</h4></Col>
            </Row>
            <Row>
                <Col xs={12} md={9} className="d-flex flex-wrap">
                { activeProductCols }
                </Col>

                <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                    <ViewCart/>
                </Col>
            </Row>
        </>
    )
}

export default UserView;