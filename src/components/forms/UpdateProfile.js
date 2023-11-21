import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext.js";
import { Button, Card, Col, CardTitle, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

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

    const updateProfile = async (e) => {
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
                
            } else {
                Swal.fire({
                    title: "Update failed",
                    icon: "error",
                    text: "Please try again later.",
                    timer: 2500
                })
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            setLoading(false);
            setIsActive(false);
            setFirstName('');
            setLastName('');
            setMobileNo('');
            setHouseNo('');
            setStreetName('');
            setCity('');
            setImg('');
        }
    }

    useEffect(() => {
        if((firstName !== '' && lastName !== '' && mobileNo !== '' && houseNo !== '' && streetName !== '' && city !== '' && img !== '') && (mobileNo.length === 11)){
            setIsActive(true);
        } else {
            setIsActive(false)
        }
    }, [])

    return (
        <Card className="w-100 m-3 shadow ">
            <CardTitle>Update Profile</CardTitle>
            
            <Form onSubmit={e => updateProfile(e)}>
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

                <Form.Group controlId="mobileNo">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Mobile Number"
                    required
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    />
                </Form.Group>

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

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="city"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="img">
                    <Form.Label>Profile Pic Link</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="img"
                    required
                    value={img}
                    onChange={e => setImg(e.target.value)}
                    />
                </Form.Group>
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
            </Form>

        </Card>
    )
}

export default UpdateProfile;