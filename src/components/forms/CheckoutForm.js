import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Button, Card, CardSubtitle, CardTitle, Col, Form, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserProfileDetails from "../user/UserProfileDetails";

function CheckoutForm() {
    const { setCart, userDetails } = useContext(UserContext);
    const [ isActive, setIsActive ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ paymentInfo, setPaymentInfo ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const userPaymentInfo = {
            paymentInfo: paymentInfo
        }
        console.log(`UserPaymentInfo: ${JSON.stringify(userPaymentInfo)}`)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userPaymentInfo)
            });

            const data = await response.json();
            if(response.ok){
                Swal.fire({
                    title: 'Successful Checkout',
                    text: `You have successfully purchased the items with ${data.paymentInfo}`,
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    }
                })
                setCart({
                    cartId: null,
                    products: [],
                    totalAmount: null
                })
                setPaymentInfo('');
                setLoading(false);
                setIsActive(false);
                navigate('/products');
            } else {
                Swal.fire({
                    title: "Checkout failed",
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
                title: "Checkout failed",
                icon: "error",
                text: "Please try again later.",
                timer: 2500
            })
            setLoading(false);
            setIsActive(false);
        }
    }

    useEffect(() => {
        if(paymentInfo !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [paymentInfo])

    return (
        <Card className="w-100 m-3 shadow ">

            <UserProfileDetails onProfile={false}/>
            
            <Form onSubmit={e => handleSubmit(e)}>
            <Row className="mx-3 mt-3">
                <Col md={6} className="mx-auto">
                    
                        <Form.Group controlId="paymentInfo">
                            <Form.Label>Payment Info</Form.Label>
                            <Form.Check
                            label="Visa"
                            name="paymentInfo"
                            type="radio"
                            value={"Visa"}
                            id="visa"
                            // checked={Visa}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="MasterCard"
                            name="paymentInfo"
                            type="radio"
                            value={"MasterCard"}
                            id="mastercard"
                            // checked={Visa}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="Cash on Delivery"
                            name="paymentInfo"
                            type="radio"
                            value={"Cash on Delivery"}
                            id="cashondelivery"
                            // checked={Visa}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="Gcash"
                            name="paymentInfo"
                            type="radio"
                            value={"Gcash"}
                            id="gcash"
                            // checked={Visa}
                            onChange={e => setPaymentInfo(e.target.value)}/>
                        </Form.Group>

                </Col>
            </Row>

            <Row className="mx-3 my-4">
                <Col xs={12} className="text-center">
                {
                    (isActive === true) ?
                    <Button variant="primary" type="submit" className="w-50 mx-auto">Confirm and Checkout</Button> 
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
                        <Button variant="primary" type="submit" className="w-50 mx-auto" disabled>Confirm and Checkout</Button>
                }
                </Col>
            </Row>
            </Form>
        </Card>
    )
}

export default CheckoutForm;