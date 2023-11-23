import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext.js";
import { Button, Card, Col, Form, Spinner, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SwalFireError } from "../util/SwalFire.js";
import Swal from "sweetalert2";

function UpdateProfile({ onProfileUpdate, onProfile }) {
    const { user, userDetails, setUserDetails } = useContext(UserContext);
    const [ firstName, setFirstName ] = useState(userDetails.firstName || '');
    const [ lastName, setLastName ] = useState(userDetails.lastName || '');
    const [ mobileNo, setMobileNo ] = useState(userDetails.mobileNo || '');
    const [ img, setImg ] = useState(userDetails.img || '');
    const [ houseNo, setHouseNo ] = useState(userDetails.address.houseNo || '');
    const [ streetName, setStreetName ] = useState(userDetails.address.streetName || '');
    const [ city, setCity ] = useState(userDetails.address.city || '');

    const [ isActive, setIsActive ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ disableInput, setDisableInput ] = useState(false);

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDisableInput(true);

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
                setUserDetails({
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
                
                setFirstName('');
                setLastName('');
                setMobileNo('');
                setHouseNo('');
                setStreetName('');
                setCity('');
                setImg('');
                setLoading(false);
                setIsActive(false);
                onProfileUpdate();
                setDisableInput(false);
                Swal.fire({
                    title: "Profile Update Successfully",
                    text: `Thank you, ${data.firstName} for updating your profile!`,
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    },
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        onProfileUpdate();
                        if(onProfile === true){
                            navigate('/profile');
                        } else {
                            navigate('/checkout');
                        }
                        };
                    })

            } else {
                const title = 'Update Failed';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);

                setLoading(false);
                setIsActive(false);
                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            const title = 'Update Failed';
            const text = 'Please Try Again Later';
            SwalFireError(title, text);

            setLoading(false);
            setIsActive(false);
            setDisableInput(false);
        }
    }

    useEffect(() => {
        if((firstName !== '' && lastName !== '' && mobileNo !== '' && houseNo !== '' && streetName !== '' && city !== '' && img !== '') && (mobileNo.length === 11 && (/^\d{11}$/.test(mobileNo)))){
            setIsActive(true);
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, mobileNo, houseNo, streetName, city, img, isActive])

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
                            disabled={disableInput === true}/>
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
                            disabled={disableInput === true}/>
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
                        disabled={disableInput === true}/>
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
                        disabled={disableInput === true}/>
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
                    disabled={disableInput === true}/>
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
                    disabled={disableInput === true}/>
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
                    disabled={disableInput === true}/>
                    <Form.Text id="mobileNoHelpBlock" muted>
                        Don't worry we can provide a default profile picture if you don't have one right now!
                    </Form.Text>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mx-3 mt-4">
                <Col xs={12} className="text-center">
                {
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
                        <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-50 mx-auto" 
                        disabled={isActive === false}>Update Profile</Button>
                }
                </Col>
            </Row>
            </Form>

        </Card>
    )
}

export default UpdateProfile;