import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext.js";
import Home from "./Home.js";
import ViewCart from "../components/user/ViewCart.js";
import { Container, Row, Col } from "react-bootstrap";
import UpdateProfile from "../components/forms/UpdateProfile.js";

function Checkout() {
    const { user, cart, setCart } = useContext(UserContext);
    const [ profileHasAddress, setProfileHasAddress ]= useState(false);

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
        <Row>
            <Col xs={12} md={8} className="d-flex flex-wrap mx-auto mb-auto">
                <UpdateProfile />
            </Col>
            <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                <ViewCart/>
            </Col>
        </Row>
        :
        <Row>
            <Col xs={12} md={8} className="d-flex flex-wrap mx-auto mb-auto">
                <h1>Checkout</h1>
            </Col>
            <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                <ViewCart/>
            </Col>
        </Row>}
    </Container>
    )
}

export default Checkout;