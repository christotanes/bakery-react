import React, { useContext, useState, useEffect } from "react";
import UserContext from '../UserContext';
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Card, FormGroup, FormLabel, Button, Form } from "react-bootstrap";

function AddProduct() {
    const { user } = useContext(UserContext);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ type, setType ] = useState('');
    const [ size, setSize ] = useState('');
    const [ quantity, setQuantity ] = useState(0);
    const [ price, setPrice ] = useState(0);
    const [ img, setImg ] = useState('');
    const [ imgLqip, setImgLqip ] = useState('');
    const [ imgBanner, setImgBanner ] = useState('');
    const [ imgBannerLqip, setImgBannerLqip ] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [ isActive, setIsActive ] = useState(false);

    const addProduct = async (e) => {
        console.log('This is addProduct async Function')

        const newProductData = {
            name: name,
            description: description,
            type: type,
            size: size,
            quantity: quantity,
            price: price,
            img: img,
            imgLqip: imgLqip,
            imgBanner: imgBanner,
            imgBannerLqip: imgBannerLqip
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newProductData)
            })
        } catch (error) {
            setError(error.message);
        } finally {
            setIsActive(false);
            setLoading(false);
            setName('')
            setDescription('')
            setType('')
            setSize('')
            setQuantity(0)
            setPrice(0)
            setImg('')
            setImgLqip('')
            setImgBanner('')
            setImgBannerLqip('')
        }
    }

    return (
        <>
        {
            (user.isAdmin !== true) ? <Navigate to={"/"} /> :
            <Container id="addProduct">
                <Row>
                    <Col xs={12} className="mt-3">
                        <h1>Add a New Product</h1>
                        <p className="mb-0">All fields with * are required</p>
                    </Col>
                </Row>
                <Form onSubmit={addProduct}>
                    <Row className="mb-3">
                        <Col xs={12} className="d-flex flex-column justify-content-center my-3">
                            <FormGroup>
                                <FormLabel>imgBanner link:</FormLabel>
                                <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="This is where imgBanner will be placed" required value={imgBanner} 
                                onChange={e => setImgBanner(e.target.value)}/>
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <FormLabel>imgBannerLqip or Low Quality Image Picture link:</FormLabel>
                                <Form.Control 
                                as="textarea"
                                rows={2}
                                placeholder="This is where imgBannerLqip will be placed if imgBanner is not available" required value={imgBannerLqip} 
                                onChange={e => setImgBannerLqip(e.target.value)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={5} className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FormGroup>
                                    <FormLabel>img link:</FormLabel>
                                    <Form.Control 
                                    as="textarea"
                                    rows={2}
                                    placeholder="This is where img will be placed" 
                                    required 
                                    value={img} 
                                    onChange={e => setImg(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <FormLabel>imgLqip Low Quality Image Picture link:</FormLabel>
                                    <Form.Control 
                                    as="textarea"
                                    rows={2} 
                                    placeholder="This is where imgLqip will be placed if img is not available" 
                                    required 
                                    value={imgLqip} 
                                    onChange={e => setImgLqip(e.target.value)}/>
                                </FormGroup>
                                <Card.Title className="mt-2">
                                    <FormLabel>Product Name:</FormLabel>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Name of Product" 
                                    required 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}/>
                                </Card.Title>
                                <Card.Text>
                                    <FormLabel>Product Price:</FormLabel><br/>
                                    PhP
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Price of Product" 
                                    required value={price} 
                                    min={0}
                                    onChange={e => setPrice(e.target.value)}/>
                                
                                <span><FormLabel>Product Quantity:</FormLabel>
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Quantity of Product" 
                                    required 
                                    value={quantity} 
                                    min={0}
                                    onChange={e => setQuantity(e.target.value)}/></span>
                                </Card.Text>
                                <Button variant="primary" disabled>Add to Cart</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <FormLabel>Product Description:</FormLabel>
                                <Form.Control 
                                as="textarea"
                                rows={5}
                                placeholder="Description of Product" 
                                required 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}/>
                            <Row className="mt-3">
                                <Col xs={5}>
                                    <h5>Type:</h5>
                                    <FormLabel>Product Type:</FormLabel>
                                    <Form.Control as="select" required value={type} 
                                    onChange={e => setType(e.target.value)}>
                                        <option value="">Select Type</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Bread">Bread</option>
                                        <option value="Snack">Snack</option>
                                    </Form.Control>
                                    <h5>Size:</h5>
                                    <FormLabel>Product Size:</FormLabel>
                                    <Form.Control as="select" required value={size} 
                                    onChange={e => setSize(e.target.value)}>
                                        <option value="">Select Size</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </Form.Control>
                                    <h5>Flavors:</h5>

                                    <h5>Allergens:</h5>
                                    
                                </Col>
                                <Col xs={5}>
                                    <h5>Weight:</h5>
                                    
                                    <h5>Vegetarian:</h5>
                                    
                                    <h5>Best Before:</h5>
                                    
                                    <h5>Available for delivery:</h5>
                                    
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            </Form>
            </Container>
        }
        </>
    )
};

export default AddProduct;