import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserView({ activeProducts }) {
    const activeProductCols = activeProducts.map((product) => (
        <Col xs={12} md={5} lg={4} key={product._id} className="my-3">
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
                <Col>
                    <h1>Filter</h1>
                </Col>
            </Row>
            <Row>
            { activeProductCols }
            </Row>
            <Row>
                <Col>
                    <h1>Cart</h1>
                </Col>
            </Row>
        </>
    )
}

export default UserView;