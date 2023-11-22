import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";
import UserProfileDetails from "../components/user/UserProfileDetails";
import { Col, Container, Row, Card, Image, Button } from "react-bootstrap";
import ViewCart from "../components/user/ViewCart";
import UpdateProfile from "../forms/UpdateProfile";
import UserOrders from "../components/user/UserOrders";
import ResetPassword from "../forms/ResetPassword";


function Profile() {
    const { userDetails } = useContext(UserContext);
    const [ onUpdate, setOnUpdate ] = useState(false);

    const handleUpdateProfile = () => {
        setOnUpdate(true);
    }
    const handleProfileUpdate = () => {
        setOnUpdate(false);
    };

    useEffect(() => {
        setOnUpdate(false)
    }, [userDetails])

    return(
        <Container fluid id="profile">
            <Row>
                <Col xs="auto" className="mx-auto mt-3 mb-1 d-flex">
                    <Image src={userDetails.img} width={100} height={100} className="userImg me-3 rounded-circle shadow"/>
                    <h3 className="text-center font-weight-bold align-self-center">{userDetails.firstName ? `${userDetails.firstName}'s` : "Your"} Profile</h3>
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto d-flex justify-content-center my-3">
                    {
                        onUpdate === true ?
                        <Button variant="outline-danger w-xs-100 w-md-25 shadow" onClick={handleProfileUpdate}>Cancel Update</Button> :
                        <Button variant="outline-success w-xs-100 w-md-25 shadow" onClick={handleUpdateProfile}>Update Profile</Button> 
                    }
                    <ResetPassword />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8} className="d-flex flex-wrap mx-auto mb-auto">
                    {
                        onUpdate === true ? 
                        <UpdateProfile onProfile={true} onProfileUpdate={handleProfileUpdate}/> 
                        : 

                        <Card className="w-100 m-3 shadow-lg">
                            <UserProfileDetails/>
                        </Card>
                        
                    }
                    
                </Col>
                <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                    <ViewCart onCheckout={false}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={11} className="mb-auto my-3 mx-auto">
                    <UserOrders />
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;