import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ products }) {
    const { _id, img, name, description, price, imgLqip } = products;

    return (
        <>
        <Card style={{ width: '18rem', background: `url('${imgLqip}'), contain` }} key={_id}>
        <Card.Img variant="top" src={img}/>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
            <h5 className="text-end text-danger border-bottom">
            ₱ {price}
            </h5>
            <Button variant="primary" as={Link} to={`/products/${_id}`} exact>Details</Button>
        </Card.Body>
        </Card>
        </>
    )
}

export default ProductCard;