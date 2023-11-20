{/* <Container id="addProduct">
                <Form>
                    <Row className="my-3">
                        <Col xs={12} className="d-flex flex-column justify-content-center my-3">
                            <FormGroup>
                                <FormLabel>imgBanner link:</FormLabel>
                                <Form.Control type="textarea" placeholder="This is where imgBanner will be placed" required value={imgBanner} 
                            onChange={e => setImgBanner(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>imgBannerLqip or Low Quality Image Picture link:</FormLabel>
                                <Form.Control type="textarea" placeholder="This is where imgBannerLqip will be placed" required value={imgBannerLqip} 
                            onChange={e => setImgBannerLqip(e.target.value)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={5} className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }}>
                            <FormGroup>
                                <FormLabel>img link:</FormLabel>
                                <Form.Control type="text" placeholder="This is where img will be placed" required value={img} 
                            onChange={e => setImg(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>imgLqip Low Quality Image Picture link:</FormLabel>
                                <Form.Control type="text" placeholder="This is where imgLqip will be placed" required value={imgLqip} 
                            onChange={e => setImgLqip(e.target.value)}/>
                            </FormGroup>
                            <Card.Body>
                                <Card.Title><FormLabel>Product Name:</FormLabel>
                                <Form.Control type="text" placeholder="Name of Product" required value={name} 
                            onChange={e => setName(e.target.value)}/></Card.Title>
                                <Card.Text><FormLabel>Product Price:</FormLabel>
                                <Form.Control type="number" placeholder="Price of Product" required value={price} 
                            onChange={e => setPrice(e.target.value)}/></Card.Text>
                                <span><FormLabel>Product Quantity:</FormLabel>
                                <Form.Control type="number" placeholder="Quantity of Product" required value={quantity} 
                            onChange={e => setQuantity(e.target.value)}/></span><br/>
                                <Button variant="primary" disabled>Add to Cart</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <FormLabel>Product Description:</FormLabel>
                                <Form.Control type="text" placeholder="Description of Product" required value={description} 
                            onChange={e => setDescription(e.target.value)}/>
                            <Row>
                                <Col xs={5}>
                                    <h5>Type:</h5>
                                    <FormLabel>Product Type:</FormLabel>
                                    <Form.Control type="select" placeholder="Type of Product" required value={type} 
                                    onChange={e => setType(e.target.value)}>
                                        <option value="Cake">Cake</option>
                                        <option value="Bread">Bread</option>
                                        <option value="Snack">Snack</option>
                                    </Form.Control>
                                    <h5>Size:</h5>
                                    <FormLabel>Product Size:</FormLabel>
                                    <Form.Control type="select" placeholder="Description of Product" required value={size} 
                                    onChange={e => setSize(e.target.value)}>
                                        <option value="Regular">Regular</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </Form.Control>
                                    <h5>Flavors:</h5>
                                    <FormLabel>Product Flavors:</FormLabel>
                                    <Form.Control type="text" placeholder="Flavors of Product" required value={flavor} 
                                    onChange={e => setSize(e.target.value)}>
                                        <option value="Regular">Regular</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </Form.Control>
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
            </Container> */}