import React, { useState } from "react";
import Swal from "sweetalert2";
import AddEditForm from "../forms/AddEditForm";

function AddProduct({ getAllProducts }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [ isActive, setIsActive ] = useState(false);

    const addProduct = async (newProductData, closeModal) => {
        console.log('This is addProduct async Function');
        setLoading(true);
        setIsActive(false);

        // const newProductData = {
        //     name: name,
        //     description: description,
        //     type: type,
        //     size: size,
        //     quantity: quantity,
        //     price: price,
        //     allergens: allergens,
        //     weight: weight,
        //     deliveryAvailable: deliveryAvailable,
        //     flavors: flavors,
        //     bestBefore: bestBefore,
        //     vegetarian: vegetarian,
        //     img: img,
        //     imgLqip: imgLqip,
        //     imgBanner: imgBanner,
        //     imgBannerLqip: imgBannerLqip
        // }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newProductData)
            })

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Product Added Successfully',
                    icon: 'success',
                    text: `${data.name} was added successfully.`
                })
            } else {
                Swal.fire({
                    title: 'Failed to Add Product',
                    icon: 'error',
                    text: `Please try again later.`
                })
            }
        } catch (error) {
            setError(error.message);
        } finally {
            closeModal();
            getAllProducts();
        }
    };

    return (
        <>
        <AddEditForm
                    initialProduct={null}
                    onSubmit={addProduct}
                    isEditMode={false}
                    loadingData={loading}
                    isActiveData={isActive}
                />
        {/* {
            <Container id="addProduct">
                <Row className="px-5 pt-3 text-center">
                    <Col xs={12} className="mt-3">
                        <h1>Add a New Product</h1>
                        <p className="mb-3">All fields in <span className="text-danger">red</span> are required</p>
                        <Button as={Link} to={"/products"} variant="primary" size="sm">Return to Admin Dashboard</Button>
                    </Col>
                </Row>
                <Form onSubmit={addProduct} className="px-5">
                    <Row className="mb-3">
                        <Col xs={12} className="d-flex flex-column justify-content-center my-3" style={{ width: '500' }}>

                            <Form.Group controlId="imgBanner">
                                <Form.Label className="text-danger">Product's Banner link:</Form.Label>
                                <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="This is where image banner will be placed" required value={imgBanner} 
                                onChange={e => setImgBanner(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="imgBannerLqip" className="mt-2">
                                <FormLabel className="text-danger">Product's Low Quality Image Picture link:</FormLabel>
                                <Form.Control 
                                as="textarea"
                                rows={2}
                                placeholder="This is where image banner low quality image picture will be placed if banner is not available" required value={imgBannerLqip} 
                                onChange={e => setImgBannerLqip(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={5} className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }} className="mb-auto">
                            <Card.Body>

                                <Form.Group controlId="img">
                                    <Form.Label className="text-danger">Product's Image link:</Form.Label>
                                    <Form.Control 
                                    as="textarea"
                                    rows={2}
                                    placeholder="This is where image will be placed" 
                                    required 
                                    value={img} 
                                    onChange={e => setImg(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="imgLqip" className="mt-2">
                                    <Form.Label className="text-danger">Product's Low Quality Image Picture link:</Form.Label>
                                    <Form.Control 
                                    as="textarea"
                                    rows={2} 
                                    placeholder="This is where low quality image picture will be placed if image is not available" 
                                    required 
                                    value={imgLqip} 
                                    onChange={e => setImgLqip(e.target.value)}/>
                                </Form.Group>

                                <Card.Title className="mt-2">
                                <Form.Group controlId="name">
                                    <Form.Label className="text-danger">Product's Name:</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Name of Product" 
                                    required 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}/>
                                </Form.Group>
                                </Card.Title>

                                <Card.Text>
                                <Form.Group controlId="price">
                                    <Form.Label className="text-danger">Price:</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    required value={price} 
                                    min={0}
                                    onChange={e => setPrice(e.target.value)}/>
                                </Form.Group>
                                
                                <Form.Group controlId="quantiy">
                                    <Form.Label className="text-danger">Quantity:</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    required 
                                    value={quantity} 
                                    min={0}
                                    onChange={e => setQuantity(e.target.value)}/>
                                </Form.Group>
                                </Card.Text>

                                <Button variant="primary" className="w-100" disabled>Add to Cart</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="description">
                                <Form.Label className="text-danger">Product's Description:</Form.Label>
                                    <Form.Control 
                                    as="textarea"
                                    rows={5}
                                    placeholder="Description of Product" 
                                    required 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)}/>
                            </Form.Group>

                            <Row className="py-3">
                                <Col xs={5} className="mx-auto">
                                    <Form.Group controlId="type">
                                        <Form.Label className="text-danger">Type:</Form.Label>
                                        <Form.Control 
                                        as="select" 
                                        required 
                                        value={type} 
                                        onChange={e => setType(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="Cake">Cake</option>
                                            <option value="Bread">Bread</option>
                                            <option value="Snack">Snack</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="size" className="my-1">
                                        <Form.Label className="text-danger">Size:</Form.Label>
                                        <Form.Control 
                                        as="select" 
                                        required 
                                        value={size} 
                                        onChange={e => setSize(e.target.value)}>
                                            <option value="">Select Size</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="flavors" className="d-flex flex-column my-1">
                                        <Form.Label>Flavors:</Form.Label>
                                        <Button className="my-1" size="sm" variant="outline-primary" onClick={e => handleFlavorAddField(e)}>
                                            Add More
                                        </Button>
                                        {
                                            flavors.map((flavor, index) => (
                                            <Form.Group key={index} className="my-1">
                                            <Form.Control 
                                                type="text"
                                                value={flavor}
                                                onChange={(event) => handleFlavorChange(index, event)}>
                                            </Form.Control>
                                            <Button className="my-1" size="sm" variant="outline-primary" onClick={() => handleFlavorRemoveField(index)}>
                                                Remove
                                            </Button>
                                            </Form.Group>
                                        ))}
                                    </Form.Group>

                                    <Form.Group controlId="allergens" className="my-1">
                                        <Form.Label>Allergens:</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                value="Dairy"
                                                label="Dairy"
                                                onChange={e => handleCheckboxChange(e)}
                                                />
                                            <Form.Check
                                                type="checkbox"
                                                value="Nuts"
                                                label="Nuts"
                                                onChange={e => handleCheckboxChange(e)}
                                                />
                                            <Form.Check
                                                type="checkbox"
                                                value="Gluten"
                                                label="Gluten"
                                                onChange={e => handleCheckboxChange(e)}
                                                />
                                            <Form.Check
                                                type="checkbox"
                                                value="Eggs"
                                                label="Eggs"
                                                onChange={e => handleCheckboxChange(e)}
                                                />
                                            <Form.Check
                                                type="checkbox"
                                                value="Wheat"
                                                label="Wheat"
                                                onChange={e => handleCheckboxChange(e)}
                                                />
                                    </Form.Group>
                                </Col>
                                <Col xs={5} className="mx-auto">

                                    <Form.Group controlId="weight" className="my-1">
                                        <Form.Label>Weight:</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        placeholder="Weight of Product" 
                                        required 
                                        value={weight} 
                                        onChange={e => setWeight(e.target.value)}/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="vegetarian" className="my-1">
                                        <Form.Label>Is Product Vegetarian?</Form.Label>
                                        <Form.Check
                                                type="switch"
                                                id="vegetarian"
                                                value={vegetarian}
                                                label="Check if YES"
                                                onChange={e => setVegetarian(e.target.checked)}
                                            />
                                    </Form.Group>

                                    <Form.Group controlId="bestBefore" className="my-1">
                                        <Form.Label>Best Before:</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        placeholder="Best Before Day of Product" 
                                        required value={bestBefore} 
                                        min={1}
                                        max={7}
                                        onChange={e => setBestBefore(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group controlId="deliveryAvailable" className="my-1">
                                        <Form.Label>Is Product Available for Delivery?</Form.Label>
                                        <Form.Check 
                                                type="switch"
                                                id="deliveryAvailable"
                                                value={deliveryAvailable}
                                                label="Check if YES"
                                                onChange={e => setDeliveryAvailable(e.target.checked)}
                                            />
                                    </Form.Group>
                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} className="my-3 text-center">

                        {
                                (isActive) ? 
                                <Button variant="success" className="mt-4 w-50" type="submit">Add Product</Button>
                                :
                                (loading) ?
                                <>
                                    <Button variant="success" className="w-50" disabled>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Loading...</span>
                                    </Button>
                                </> 
                                :
                                <Button variant="success" className="mt-4 w-50" disabled>Add Product</Button>
                        }

                        </Col>
                    </Row>
                </Form>
            </Container>
        } */}
        </>
    )
};

export default AddProduct;