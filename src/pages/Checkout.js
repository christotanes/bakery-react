import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext.js";
import Home from "./Home.js";
import ViewCart from "../components/user/ViewCart.js";
import { Container, Row, Col } from "react-bootstrap";
import UpdateProfile from "../components/forms/UpdateProfile.js";
import CheckoutForm from "../components/forms/CheckoutForm.js";

function Checkout() {
    const { user, cart, setCart } = useContext(UserContext);
    const [ profileHasAddress, setProfileHasAddress ]= useState(true);

    useEffect(() => {
        if (user.address === undefined || user.address === null) {
            setProfileHasAddress(false)
        }
    }, [profileHasAddress])
    

    return(
    <Container fluid id="checkout">
        {(user.isAdmin === true) ?
        <Home />
        :
        (profileHasAddress === false) ?
        <>
        <Row>
            <Col xs="auto" className="mx-auto mt-3 mb-1">
                <h3 className="text-center font-weight-bold">Update Profile</h3>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={8} className="d-flex flex-wrap mx-auto mb-auto">
                <UpdateProfile />
            </Col>
            <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                <ViewCart onCheckout={true}/>
            </Col>
        </Row>
        </>
        :
        <>
        <Row>
            <Col xs="auto" className="mx-auto mt-3 mb-1">
                <h3 className="text-center font-weight-bold">Review Your Checkout Details</h3>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={8} className="d-flex flex-wrap mx-auto mb-auto">
                <CheckoutForm />
            </Col>
            <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                <ViewCart onCheckout={true}/>
            </Col>
        </Row>
        </>
        }
    </Container>
    )
}

export default Checkout;