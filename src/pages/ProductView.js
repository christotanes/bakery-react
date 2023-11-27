import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Error from "./Error";
import AddToCart from "../components/user/AddToCart";
import UserContext from "../UserContext";
import Products from "./Products";
import { LazyLoad } from "../common/util/LazyLoad";

function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const [ product, setProduct ] = useState('');
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState(null);
    const [ productToCart, setProductToCart ] = useState(0);
    const [ productLeft, setProductLeft ] = useState(10);
    const [ disableAdd, setDisableAdd ] = useState(false);
    const [ disableMinus, setDisableMinus ] = useState(true);

    const getProductById = async () => {
        setLoading(true)
        try {
            const productResponse = await fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }`);

            const data = await productResponse.json();

            if(productResponse.ok){
                setProduct(data);
                setProductLeft(data.quantity)
                console.log(product)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    } 

    const { _id, name, description, price, quantity, type, size, flavors, allergens, weight, vegetarian, bestBefore, deliveryAvailable, img, imgBanner, imgLqip, imgBannerLqip } = product;
    const subTotal = productToCart * price;

    useEffect(() => {
        getProductById();
    }, []);

    if (loading) {
        return <Image src='https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is' className='rounded-circle suspenseImage'/>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <Error />
    }

    function addToCart(e) {
        e.stopPropagation();
        if (productLeft <= 0) {
            setDisableAdd(true);
        } else {
            setProductToCart(productToCart + 1);
            setProductLeft(productLeft - 1);
            setDisableMinus(false);
        }
    };

    function removeToCart(e) {
        e.stopPropagation();
        if(productToCart <=0){
            setDisableMinus(true);
        } else {
            setProductToCart(productToCart - 1);
            setProductLeft(productLeft + 1);
            setDisableAdd(false);
        }
    };

    const setProductToCartData = {setProductToCart};

    return(
        user.isAdmin === true ?
        <Products />
        :
        <Container id="productView">
            <Row className="my-3 productBannerRow">
                <Col xs={12} className="d-flex justify-content-center my-3">
                <LazyLoad image={imgBanner} imageLqip={imgBannerLqip} alt={name} width={`500`} height={`200`} className={"productBanner shadow-lg productViewImage"}/>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={5} className="d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="shadow">
                    <LazyLoad id={_id} image={img} imageLqip={imgLqip} alt={name} width={`100%`} height={`100%`}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <h5 className="mt-2 text-end text-danger border-bottom mb-3">₱ {price}</h5>
                            <span>Quantity: {quantity} </span>
                            <p> Add to Cart: {productToCart}</p>
                            <p>Your Total: <span className="text-danger">₱ {subTotal}</span></p>
                            <p>
                            {disableAdd ? 
                                <>
                                {/* There are still products left, button to add disabled, button to remove is active */}
                                    <Button 
                                    variant="outline-primary" 
                                    onClick={e => addToCart(e)} 
                                    size="sm"
                                    className="me-2"
                                    disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg></Button> 
                                </>
                                    :
                                <>
                                    <Button 
                                    variant="outline-primary" 
                                    onClick={e => addToCart(e)} 
                                    size="sm"
                                    className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg></Button> 
                                </>
                                }
                            {
                                disableMinus ? 
                                <>
                                    <Button 
                                    variant="outline-primary" 
                                    onClick={e => removeToCart(e)}
                                    size="sm"
                                    disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                                    </svg></Button>
                                </>
                                :
                                <>
                                <Button 
                                    variant="outline-primary" 
                                    onClick={e => removeToCart(e)}
                                    size="sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                                    </svg></Button>
                                </>

                            }
                                    
                                </p>
                    {
                        disableMinus ?
                        <Button 
                        variant="primary" 
                        className="my-3 w-100" 
                        disabled>Add to Cart</Button>
                        :
                        <AddToCart productId={ _id }
                        productName={ name }
                        productImg={ img }
                        productImgLqip={ imgLqip}
                        productPrice={ price }
                        productToCart={ productToCart } 
                        getProductById={ getProductById }
                        setProductToCartData={ setProductToCartData }/>
                    }
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
            {/* <Row>
                <Col>
                    
                </Col>
            </Row> */}
        </Container>
    )
};

export default ProductView;