import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext.js";
import { Button, Card, Col, Form, Spinner, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const { user, setUser } = useContext(UserContext);
    const [ firstName, setFirstName ] = useState(user.firstName || '');
    const [ lastName, setLastName ] = useState(user.lastName || '');
    const [ mobileNo, setMobileNo ] = useState(user.mobileNo || '');
    const [ img, setImg ] = useState(user.img || '');
    const [ houseNo, setHouseNo ] = useState(user.address.houseNo || '');
    const [ streetName, setStreetName ] = useState(user.address.streetName || '');
    const [ city, setCity ] = useState(user.address.city || '');

    const [ isActive, setIsActive ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userProfileData = {
            firstName: firstName,
            lastName: lastName,
            mobileNo: Number(mobileNo),
            address: {
                houseNo: houseNo,
                streetName: streetName,
                city: city
            },
            img: img
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userProfileData)
            });

            const data = await response.json();

            if(response.ok){
                Swal.fire({
                    title: "Profile Update Successfully",
                    icon: "success",
                    text: `Thank you, ${data.firstName} for updating your profile!`
                })

                setUser({
                    id: data.id,
                    isAdmin: data.isAdmin,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    mobileNo: data.mobileNo,
                    address: {
                        houseNo: data.address.houseNo,
                        streetName: data.address.streetName,
                        city: data.address.city
                    },
                    img: data.img
                })
                navigate('/checkout');
                setLoading(false);
                setIsActive(false);
                setFirstName('');
                setLastName('');
                setMobileNo('');
                setHouseNo('');
                setStreetName('');
                setCity('');
                setImg('');
            } else {
                Swal.fire({
                    title: "Update failed",
                    icon: "error",
                    text: "Please try again later.",
                    timer: 2500
                })
                setLoading(false);
                setIsActive(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            Swal.fire({
                title: "Update failed",
                icon: "error",
                text: "Please try again later.",
                timer: 2500
            })
        }
    }

    useEffect(() => {
        if((firstName !== '' && lastName !== '' && mobileNo !== '' && houseNo !== '' && streetName !== '' && city !== '' && img !== '') && (mobileNo.length === 11 && (/^\d{11}$/.test(mobileNo)))){
            setIsActive(true);
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, mobileNo, houseNo, streetName, city, img])

    return (
        <Card className="w-100 m-3 shadow ">
            <Form onSubmit={e => handleUpdate(e)} className="mb-3">
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <Form.Group controlId="mobileNo">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Mobile Number"
                    required
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    />
                    <Form.Text id="mobileNoHelpBlock" muted>
                        Your mobileNo must be 11 numerical digits, no spaces or dashes in between.
                    </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
                
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <Form.Group controlId="houseNo">
                    <Form.Label>House No.</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="House Number"
                    required
                    value={houseNo}
                    onChange={e => setHouseNo(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="streetName">
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Street Name"
                    required
                    value={streetName}
                    onChange={e => setStreetName(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="City Name"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
                
            <Row className="mx-3 mt-3">
                <Col md={6} className="mx-auto">
                    <Form.Group controlId="img">
                    <Form.Label>Profile Pic Link</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Image URL Link"
                    required
                    value={img}
                    onChange={e => setImg(e.target.value)}
                    />
                    <Form.Text id="mobileNoHelpBlock" muted>
                        Don't worry we can provide a default profile picture if you don't have one right now!
                    </Form.Text>
                    </Form.Group>
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
            </Form>

        </Card>
    )
}

export default UpdateProfile;