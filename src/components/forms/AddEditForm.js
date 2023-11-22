import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Col, Row, FormLabel, Spinner, Modal, Container } from 'react-bootstrap';

function AddEditForm({ initialProduct, onSubmit, isEditMode, loadingData, isActiveData, disableInputData }) {
    const [ name, setName ] = useState(initialProduct?.name || '');
    const [ description, setDescription ] = useState(initialProduct?.description || '');
    const [ type, setType ] = useState(initialProduct?.type || '');
    const [ size, setSize ] = useState(initialProduct?.size || '');
    const [ quantity, setQuantity ] = useState(initialProduct?.quantity || 0);
    const [ price, setPrice ] = useState(initialProduct?.price || 0);
    const [ allergens, setAllergens ] = useState(initialProduct?.allergens || []);
    const [ weight, setWeight ] = useState(initialProduct?.weight || '');
    const [ deliveryAvailable, setDeliveryAvailable ] = useState(initialProduct?.deliveryAvailable || false);
    const [ flavors, setFlavors ] = useState(initialProduct?.flavors || []);
    const [ bestBefore, setBestBefore ] = useState(initialProduct?.bestBefore || 5);
    const [ vegetarian, setVegetarian ] = useState(initialProduct?.vegetarian || false);
    const [ img, setImg ] = useState(initialProduct?.img || '');
    const [ imgLqip, setImgLqip ] = useState(initialProduct?.imgLqip || '');
    const [ imgBanner, setImgBanner ] = useState(initialProduct?.imgBanner || '');
    const [ imgBannerLqip, setImgBannerLqip ] = useState(initialProduct?.imgBannerLqip || '');
    const [ featured, setFeatured ] = useState(initialProduct?.featured || true);

    const [ loading, setLoading ] = useState(loadingData);
    const [ showModal, setShowModal] = useState(false);
    const [ isActive, setIsActive ] = useState(isActiveData);
    const [ disableInput, setDisableInput ] = useState(disableInputData);

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        const checkboxValue = e.target.value;
        if (e.target.checked) {
          // Add the value to the array
            setAllergens([...allergens, checkboxValue]);
            console.log(allergens)
        } else {
          // Remove the value from the array
            setAllergens(allergens.filter(item => item !== checkboxValue));
        }
    };

    const handleFlavorChange = (index, e) => {
        e.stopPropagation();
        const newFlavors = [...flavors];
        newFlavors[index] = e.target.value;
        setFlavors(newFlavors);
    };

    const handleFlavorAddField = (e) => {
        e.stopPropagation();
        setFlavors([...flavors, '']);
    };

    const handleFlavorRemoveField = (index) => {
        const newFlavors = [...flavors];
        newFlavors.splice(index, 1);
        setFlavors(newFlavors);
    };

    const openModal = (product) => {
        if(product){
        console.log(product)
        setName(product.name)
        setDescription(product.description)
        setType(product.type)
        setSize(product.size)
        setQuantity(product.quantity)
        setPrice(product.price)
        setAllergens(product.allergens)
        setWeight(product.weight)
        setDeliveryAvailable(product.deliveryAvailable)
        setFlavors(product.flavors)
        setBestBefore(product.bestBefore)
        setVegetarian(product.vegetarian)
        setImg(product.img)
        setImgLqip(product.imgLqip)
        setImgBanner(product.imgBanner)
        setImgBannerLqip(product.imgBannerLqip)
        setFeatured(product.featured)
        } else {
        setName('')
        setDescription('')
        setType('')
        setSize('')
        setQuantity(0)
        setPrice(0)
        setAllergens([])
        setWeight('')
        setDeliveryAvailable(false)
        setFlavors([])
        setBestBefore(0)
        setVegetarian(false)
        setImg('')
        setImgLqip('')
        setImgBanner('')
        setImgBannerLqip('')
        setFeatured(false)
        }
    setShowModal(true);
    setDisableInput(false);
    setLoading(false);
    }

    const closeModal = () => {
        setShowModal(false);
        setIsActive(false);
        setLoading(true);
        setDisableInput(true);
        setName('')
        setDescription('')
        setType('')
        setSize('')
        setQuantity(0)
        setPrice(0)
        setAllergens([])
        setWeight('')
        setDeliveryAvailable(false)
        setFlavors([])
        setBestBefore(5)
        setVegetarian(false)
        setImg('')
        setImgLqip('')
        setImgBanner('')
        setImgBannerLqip('')
        setFeatured(false)
    }

    useEffect(() => {
        if(name !== '' && description !== '' && type !== '' && size !== '' && quantity !== 0 && price !== 0 && img !== '' && imgLqip !== '' && imgBanner !== '' && imgBannerLqip !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, description, type, size, quantity, price, img, imgLqip, imgBanner, imgBannerLqip]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            description: description,
            type: type,
            size: size,
            quantity: quantity,
            price: price,
            allergens: allergens,
            weight: weight,
            deliveryAvailable: deliveryAvailable,
            flavors: flavors,
            bestBefore: bestBefore,
            vegetarian: vegetarian,
            img: img,
            imgLqip: imgLqip,
            imgBanner: imgBanner,
            imgBannerLqip: imgBannerLqip,
            featured: featured
        };
        onSubmit(formData, closeModal);
    };

    return (
        <>
        {isEditMode ? 
        <Button variant="primary" size="sm" onClick={() => openModal(initialProduct)}>Edit</Button>
        : 
        <Button variant="success" size="sm" onClick={() => openModal()}>Add Product</Button>}
        <Modal 
        show={showModal} 
        onHide={closeModal} 
        size="xl"
        backdrop="static"
        keyboard={false}>
            <Container id={isEditMode ? "editProduct": "addProduct"}>
                <Row className="px-5 pt-3 text-center">
                    <Col xs={12} className="mt-3">
                        <h1>{isEditMode ? "Edit": "Add New"} Product</h1>
                        <p className="mb-0">All fields {isEditMode ? <span className="text-danger">are required </span> : <span className="text-danger">in red are required </span>}</p>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit} className="px-5">
                    <Row className="mb-3 productBannerRow">
                        <Col xs={12} className="d-flex flex-column justify-content-center my-3" style={{ width: '500' }}>

                            <Form.Group controlId="imgBanner">
                                <Form.Label className="text-danger">Product's Banner link:</Form.Label>
                                <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="This is where image banner will be placed" required value={imgBanner} 
                                onChange={e => setImgBanner(e.target.value)}
                                disabled={disableInput === true}/>
                            </Form.Group>

                            <Form.Group controlId="imgBannerLqip" className="mt-2">
                                <FormLabel className="text-danger">Product's Low Quality Image Picture link:</FormLabel>
                                <Form.Control 
                                as="textarea"
                                rows={2}
                                placeholder="This is where image banner low quality image picture will be placed if banner is not available" required value={imgBannerLqip} 
                                onChange={e => setImgBannerLqip(e.target.value)}
                                disabled={disableInput === true}/>
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
                                    onChange={e => setImg(e.target.value)}
                                    disabled={disableInput === true}/>
                                </Form.Group>

                                <Form.Group controlId="imgLqip" className="mt-2">
                                    <Form.Label className="text-danger">Product's Low Quality Image Picture link:</Form.Label>
                                    <Form.Control 
                                    as="textarea"
                                    rows={2} 
                                    placeholder="This is where low quality image picture will be placed if image is not available" 
                                    required 
                                    value={imgLqip} 
                                    onChange={e => setImgLqip(e.target.value)}
                                    disabled={disableInput === true}/>
                                </Form.Group>

                                <Card.Title className="mt-2">
                                <Form.Group controlId="name">
                                    <Form.Label className="text-danger">Product's Name:</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Name of Product" 
                                    required 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    disabled={disableInput === true}
                                    />
                                </Form.Group>
                                </Card.Title>

                                <Card.Text>
                                <Form.Group controlId="price">
                                    <Form.Label className="text-danger">Price:</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    required value={price} 
                                    min={0}
                                    onChange={e => setPrice(e.target.value)}
                                    disabled={disableInput === true}
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="quantiy">
                                    <Form.Label className="text-danger">Quantity:</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    required 
                                    value={quantity} 
                                    min={0}
                                    onChange={e => setQuantity(e.target.value)}
                                    disabled={disableInput === true}
                                    />
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
                                    onChange={e => setDescription(e.target.value)}
                                    disabled={disableInput === true}
                                    />
                            </Form.Group>

                            <Row className="py-3">
                                <Col xs={5} className="mx-auto">
                                    <Form.Group controlId="type">
                                        <Form.Label className="text-danger">Type:</Form.Label>
                                        <Form.Control 
                                        as="select" 
                                        required 
                                        value={type} 
                                        onChange={e => setType(e.target.value)}
                                        disabled={disableInput === true}>
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
                                        onChange={e => setSize(e.target.value)}
                                        disabled={disableInput === true}>
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
                                                onChange={(event) => handleFlavorChange(index, event)}
                                                disabled={disableInput === true}>
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
                                                checked={allergens.includes("Dairy")}
                                                onChange={e => handleCheckboxChange(e)}
                                                disabled={disableInput === true}
                                                />
                                            <Form.Check
                                                type="checkbox"
                                                value="Nuts"
                                                label="Nuts"
                                                checked={allergens.includes("Nuts")}
                                                onChange={e => handleCheckboxChange(e)}
                                                disabled={disableInput === true}/>
                                            <Form.Check
                                                type="checkbox"
                                                value="Gluten"
                                                label="Gluten"
                                                checked={allergens.includes("Gluten")}
                                                onChange={e => handleCheckboxChange(e)}
                                                disabled={disableInput === true}/>
                                            <Form.Check
                                                type="checkbox"
                                                value="Eggs"
                                                label="Eggs"
                                                checked={allergens.includes("Eggs")}
                                                onChange={e => handleCheckboxChange(e)}
                                                disabled={disableInput === true}/>
                                            <Form.Check
                                                type="checkbox"
                                                value="Wheat"
                                                label="Wheat"
                                                checked={allergens.includes("Wheat")}
                                                onChange={e => handleCheckboxChange(e)}
                                                disabled={disableInput === true}/>
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
                                        onChange={e => setWeight(e.target.value)}
                                        disabled={disableInput === true}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="vegetarian" className="my-1">
                                        <Form.Label>Is Product Vegetarian?</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            id="vegetarian"
                                            checked={vegetarian}
                                            label="Check if YES"
                                            onChange={e => setVegetarian(e.target.checked)}
                                            disabled={disableInput === true}/>
                                    </Form.Group>

                                    <Form.Group controlId="bestBefore" className="my-1">
                                        <Form.Label>Best Before:</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        placeholder="Best Before Day of Product" 
                                        required value={bestBefore} 
                                        min={1}
                                        max={7}
                                        onChange={e => setBestBefore(e.target.value)}
                                        disabled={disableInput === true}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="deliveryAvailable" className="my-1">
                                        <Form.Label>Is Product Available for Delivery?</Form.Label>
                                        <Form.Check 
                                            type="switch"
                                            id="deliveryAvailable"
                                            checked={deliveryAvailable}
                                            label="Check if YES"
                                            onChange={e => setDeliveryAvailable(e.target.checked)}
                                            disabled={disableInput === true}/>
                                    </Form.Group>

                                    <Form.Group controlId="featured" className="my-1">
                                        <Form.Label>Is Product on Promo or Featured?</Form.Label>
                                        <Form.Check 
                                            type="switch"
                                            id="featured"
                                            checked={featured}
                                            label="Check if YES"
                                            onChange={e => setFeatured(e.target.checked)}
                                            disabled={disableInput === true}/>
                                    </Form.Group>
                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} className="my-3 text-center">
                        {
                                (loading) ?
                                <>
                                    <Button variant="success" className="w-25" disabled>
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
                                <Button 
                                variant="success" 
                                className="mt-4 w-25"
                                type="submit"
                                disabled={isActive === false}>
                                {isEditMode ? "Update" : "Add"} Product</Button>
                        }
                            <Button variant="danger" 
                            className="mt-4 me-auto ms-3 w-25" 
                            onClick={closeModal}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Modal>
        </>
    );
}

export default AddEditForm;
