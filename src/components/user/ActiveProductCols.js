import { Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { LazyLoad } from "../../common/util/LazyLoad";

export function ActiveProductCols( { activeProducts } ) {
    const productsCols = activeProducts.map((product) => (
    <Col xs={12} md="auto" key={product._id} className="my-3 mx-auto">
        <Card style={{ width: '18rem' }} className="shadow-lg">
            <LazyLoad image={product.img} imageLqip={product.imgLqip} alt={product.name} width={`100%`} height={`100%`}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>{product.description}</Card.Subtitle>
                <h5 className="text-end text-danger border-bottom my-3">₱ {product.price}</h5>
                <Button variant="primary" as={Link} to={`/products/${product._id}`}>Details</Button>
            </Card.Body>
        </Card>
    </Col>
))
return productsCols;
}