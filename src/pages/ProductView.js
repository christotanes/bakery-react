import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Error from "./Error";

function ProductView() {
    const { productId } = useParams();
    const [ product, setProduct ] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductById = async () => {
        try {
            const productResponse = await fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }`);

            const data = await productResponse.json();

            if(productResponse.ok){
                setProduct(data);
                console.log(product)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        getProductById();
    }, [productId]);

    const { name, description, price, quantity, type, size, flavors, allergens, weight, vegetarian, bestBefore, deliveryAvailable, img, imgBanner } = product;

    if (loading) {
        return <Spinner animation="border" variant="success" />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <Error />
    }

    return(
        <Container id="productView">
            <Row className="my-3">
                <Col xs={12} className="d-flex justify-content-center my-3">
                    <Image src={imgBanner} className="productBanner shadow cover"/>
                </Col>
            </Row>
            <Row className="my-3">
                <Col md={5} className="d-flex justify-content-center">
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={img}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Php {price}</Card.Text>
                        <span>1 </span>|<span> {quantity}</span><br/>
                        <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <h3>{description}</h3>
                    <p>Ratings | Reviews</p>
                    <Row>
                        <Col xs={5}>
                            <h5>Type:</h5>
                            <p>{type}</p>
                            <h5>Size:</h5>
                            <p>{size}</p>
                            <h5>Flavors:</h5>
                            {flavors && Array.isArray(flavors) ? (
                            <ul>
                                {flavors.map((flavor, index) => (
                                    <li key={index}>{flavor}</li>
                                ))}
                            </ul>
                            ) : (
                                <p>No flavors available</p>
                            )}
                            <h5>Allergens:</h5>
                            {allergens && Array.isArray(allergens) ? (
                            <ul>
                                {allergens.map((allergen, index) => (
                                    <li key={index}>{allergen}</li>
                                ))}
                            </ul>
                            ) : (
                                <p>No allergens listed</p>
                            )}
                        </Col>
                        <Col xs={5}>
                            <h5>Weight:</h5>
                            <p>{weight ? weight : "No weight listed"}</p>
                            <h5>Vegetarian:</h5>
                            <p>{(vegetarian === true) ? "Yes" : "No"}</p>
                            <h5>Best Before:</h5>
                            <p>{bestBefore ? bestBefore : "No date listed"}</p>
                            <h5>Available for delivery:</h5>
                            <p>{(deliveryAvailable === true) ? "Yes" : "No"}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>
    )
};

export default ProductView;