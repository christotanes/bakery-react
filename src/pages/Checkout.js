import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext.js";
import Products from "./Products.js";
import ViewCart from "../components/user/ViewCart.js";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import UpdateProfile from "../forms/UpdateProfile.js";
import CheckoutForm from "../forms/CheckoutForm.js";
import { Link } from "react-router-dom";

function Checkout() {
    const { user, userDetails } = useContext(UserContext);
    const [ profileHasAddress, setProfileHasAddress ]= useState(true);

    const handleProfileUpdate = () => {
        setProfileHasAddress(true);
    };

    useEffect(() => {
        if (userDetails.address.streetName === undefined || userDetails.address.streetName === null || userDetails.address.city === null || userDetails.address.city === undefined || userDetails.address.houseNo === null || userDetails.address.houseNo === undefined || userDetails.firstName === undefined || userDetails.firstName === null || userDetails.lastName === null || userDetails.lastName === undefined || userDetails.mobileNo === null || userDetails.mobileNo === undefined) {
            setProfileHasAddress(false)
            console.log(userDetails)
        }
    }, [userDetails])
    

    return(
    <Container fluid id="checkout">
        {(user.isAdmin === true) ?
        <Products />
        :
        (user.id === null) ?
        <>
        <Row>
            <Col xs="auto" className="m-auto">
                <Button as={Link} to={"/login"}>Login Here</Button>
            </Col>
        </Row>
        </>
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
                <UpdateProfile onProfileUpdate={handleProfileUpdate} onProfile={false}/>
            </Col>
            <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                <ViewCart onCheckout={true}/>
            </Col>
        </Row>
        </>
        :
        <>
        <Row>
            <Col xs="auto" className="mx-auto mt-3 mb-1 d-flex">
                <Image src={userDetails.img} width={100} height={100} className="userImg me-3 rounded-circle shadow"/>
                <h3 className="text-center font-weight-bold align-self-center">Review Your Checkout Details</h3>
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