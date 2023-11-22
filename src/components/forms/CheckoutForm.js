import { useContext, useState } from "react";
import UserContext from "../../UserContext";
import { Button, Card, CardSubtitle, CardTitle, Col, Form, Row, Spinner } from "react-bootstrap";

function CheckoutForm() {
    const { user, cart, setUser, setCart } = useContext(UserContext);
    const { firstName, lastName, mobileNo, address } = user
    const [ isActive, setIsActive ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    return (
        <Card className="w-100 m-3 shadow ">
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>First Name:</CardTitle>
                    <CardSubtitle>{firstName}</CardSubtitle>
                </Col>
                <Col md={6}>
                    <CardTitle>Last Name:</CardTitle>
                    <CardSubtitle>{lastName}</CardSubtitle>
                </Col>
            </Row>
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>Mobile No:</CardTitle>
                    <CardSubtitle>{mobileNo}</CardSubtitle>
                </Col>
            </Row>
                
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>House No:</CardTitle>
                    <CardSubtitle>{address.houseNo}</CardSubtitle>
                </Col>
                <Col md={6}>
                    <CardTitle>Street Name:</CardTitle>
                    <CardSubtitle>{address.streetName}</CardSubtitle>
                </Col>
            </Row>

            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>City Name:</CardTitle>
                    <CardSubtitle>{address.city}</CardSubtitle>
                </Col>
            </Row>
                
            <Row className="mx-3 mt-3">
                <Col md={6} className="mx-auto">
                    
                </Col>
            </Row>

            <Row className="mx-3 mt-4">
                <Col xs={12} className="text-center">
                {
                    (isActive === true) ?
                    <Button variant="primary" type="submit" className="w-50 mx-auto">Update Profile</Button> 
                    :
                    (loading === true) ?
                        <>
                            <Button 
                            variant="primary" 
                            className="w-50 mx-auto"
                            disabled>
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
                        <Button variant="primary" type="submit" className="w-50 mx-auto" disabled>Update Profile</Button>
                }
                </Col>
            </Row>
        </Card>
    )
}

export default CheckoutForm;