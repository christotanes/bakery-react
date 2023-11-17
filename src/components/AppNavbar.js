// import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import {Container, Form, Button, NavLink, Nav, Navbar, NavDropdown, Offcanvas, Image} from 'react-bootstrap';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

function OffcanvasExample() {
    return (
    <>
        {['lg'].map((expand) => (
            <Navbar key={expand} expand={expand} bg="dark" data-bs-theme="dark">
                <Container fluid className='mb-0'>
                    <Navbar.Brand as={Link} to="/" exact>
                        <Image
                            src="https://drive.google.com/uc?id=1N5PXtEmWAjpXubaVO7HsXyCJFX3NSFrr"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="JerryBee logo"
                            roundedCircle/>
                    </Navbar.Brand>
                    <Navbar.Brand as={Link} to="/" exact>JerryBee Bakery</Navbar.Brand>
                    <Nav variant="underline" className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={Link} to="/register" exact>Register</Nav.Link>
                        <Nav.Link as={Link} to="/login" exact>Login</Nav.Link>
                        <Nav.Link as={Link} to="/products" exact>Browse</Nav.Link>
                        <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
                        <NavDropdown
                            title="Cart"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>

                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                    {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Cart
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            
                        </Offcanvas.Body>
                    </Navbar.Offcanvas> */}
                </Container>
            </Navbar>
        ))}
    </>
    );
}

export default OffcanvasExample;