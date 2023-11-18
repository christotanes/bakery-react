import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserView({ products }) {
    const { _id, img, name, description, price } = products;

    return (
        <>
        <Row>
            <Col>
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
            
        </>
    )
}

export default UserView;