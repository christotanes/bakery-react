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
                            src="https://doc-0g-c4-docs.googleusercontent.com/docs/securesc/6ui7t6t4dg26l13ncsph17ma09gaklha/ud1dtfs5u3sbbl3vqvijaqsie1bvno80/1700240325000/14440719014780408577/01968931102250981873/1N5PXtEmWAjpXubaVO7HsXyCJFX3NSFrr?ax=AI0foUp2AS4hHjOYFMd3c145LFTk5kMKL0LWAVvLfcovhNWIlYH6D0H8J0FTO6N2JNdeCrO3r9ezPb8ZMv69XDK-2O80WqE_NFolwU-eSt2LO0tuerRAvDw0kmc2oyvmOs7NVq8JlM9KWAxgOez60jKH74xpKsTVVHK5GgvRkAHIcwoaYssRzDL3IxShN9RctrUY12ZKriwUkvoJkiOuLL8N4eEDlnhDznLTuyj_704pn1kLvgoYJ2ro5zTieh9oRZQNb5ue48BmIOo0rwYBdnb2qJUOGy2b1z6c4BoYRx2IHe-0CHezfp6sU-iixVlLL_SSP_Vc3SD_YWcIoJx5tD6pWs8LJtS_jvcSwjZTiCALms7kFOa8fst8bJ9EwzRBsl-IDFe9HfGpqWPH-tdX00aGwQ6ydOtp63_Vr9WHbqbggt-HeDqnM7iOjqAABQ1VDVXnv0Qs0lhSXgooa9XI6vffn9umkC4r6-KA6AUWUZAOI6Pp4gOxM2LhhKlVvLAEMrR0dwPQBK7Rzo6MVrIB2U600e0tea4huWNSfknNlwy6R41MyXmUeyRyvDzc3aCmnETNPCOwHxYs7G7uAUvQqOs5o3bDROI5_NdCsKISejV7saJYJ5X49yznGkRiKYSK9P3-d81b8HDQlLG9BF1xWraf-Fr-ydoj9nLcUeMxyqghscTdwxIW_2ZdXE_XQW1_oyk85DllX8Z04eK8FPLW9YiPaRj_3pkLhF0_LIVPopKFFuBISqJpJhZtR8biI0PGA_Z7INf6gKP7_c40whvnFL3PnCkOUrWtcESWdgDEUgRu7L246wxTyEoodAX7h07RPPkpIMHiMHKMfhkeJNu6G1RkAzV8A-nr5_cpKCFB3l5COJzAVeAZO5Om1bnM6o2vWagUBsLQ9cXW-xkZSg0cDz7WquZTaM8ZgQAXdf8&uuid=3753d881-983e-4ef6-ad88-96e236990f21&authuser=0&nonce=rjhq0vrvedkh0&user=01968931102250981873&hash=hs2bfd00nt3ark4us1uo36q0flske1i8"
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