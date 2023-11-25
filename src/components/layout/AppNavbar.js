// import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import {Container, Form, Button, Nav, Navbar, NavDropdown, Image} from 'react-bootstrap';
import UserContext from '../../UserContext';
import { Link } from 'react-router-dom';

function AppNavbar() {
    const { user, cart } = useContext(UserContext);

    return (
    <>
        {['lg'].map((expand) => (
            <Navbar key={expand} expand={expand} bg="dark" data-bs-theme="dark">
                <Container className='mb-0'>
                    <Navbar.Brand as={Link} to="/" exact>
                        <Image
                            src="https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="JerryBee logo"
                            roundedCircle/>
                    </Navbar.Brand>
                    <Navbar.Brand as={Link} to="/" exact>JerryBee Bakery</Navbar.Brand>
                    
                    <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Under Construction"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success" disabled>Search</Button>
                            </Form>
                    <Nav variant="underline" className="align-item-end ms-auto">
                    
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant="underline" className="justify-content-end flex-grow-1 pe-3 me-auto">
                            {(user.id && user.isAdmin === false) ? 
                                <NavDropdown
                                title="Cart"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                {cart.products.map((product, index) => (
                                    <NavDropdown.Item key={index} as={Link} to={`/products/${product.productId}`} className='d-flex justify-content-between'>
                                        <span className='me-2'>{product.name}</span> <span>{product.quantity} x {product.price}</span>
                                    </NavDropdown.Item>
                                    ))}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='d-flex justify-content-between'>
                                    <span>Total Amount: </span>
                                    <span>₱ {cart.totalAmount}</span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/checkout" className='text-center bg-danger'>Checkout</NavDropdown.Item>
                                </NavDropdown>
                            : null
                            }
                            <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
                            {(user.isAdmin) ? 
                                <Nav.Link as={Link} to="/products" exact>Admin</Nav.Link>
                                :
                                <Nav.Link as={Link} to="/products" exact>Browse</Nav.Link>}
                            
                            
                            {(user.id) ? 
                                <>
                                <Nav.Link as={Link} to="/profile" exact>Profile</Nav.Link>
                                <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link> 
                                </>
                                : 
                                <>
                                    <Nav.Link as={Link} to="/register" exact>Register</Nav.Link>
                                    <Nav.Link as={Link} to="/login" exact>Login</Nav.Link>
                                </>
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        ))}
    </>
    );
}

export default AppNavbar;