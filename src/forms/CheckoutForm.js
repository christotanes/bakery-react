import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserProfileDetails from "../components/user/UserProfileDetails";
import { SwalFireError, SwalFireSuccess } from "../util/SwalFire";

function CheckoutForm() {
    const { setCart } = useContext(UserContext);
    const [ isActive, setIsActive ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ paymentInfo, setPaymentInfo ] = useState('');
    const [ disableInput, setDisableInput ] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        setDisableInput(true);
        e.preventDefault();

        const userPaymentInfo = {
            paymentInfo: paymentInfo
        }

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
                const title = 'Successful Checkout';
                const text = `You have successfully purchased the items with ${data.paymentInfo}`;
                SwalFireSuccess(title, text);

                setCart({
                    cartId: null,
                    products: [],
                    totalAmount: null
                })
                setPaymentInfo('');
                setLoading(false);
                setIsActive(false);
                setDisableInput(false);
                navigate('/products');
            } else {
                const title = 'Checkout Failed';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);

                setLoading(false);
                setIsActive(false);
                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            const title = 'Checkout Failed';
            const text = 'Please Try Again Later';
            SwalFireError(title, text);

            setLoading(false);
            setIsActive(false);
            setDisableInput(false);
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
                            disabled={disableInput === true}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="MasterCard"
                            name="paymentInfo"
                            type="radio"
                            value={"Mastercard"}
                            id="mastercard"
                            disabled={disableInput === true}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="Cash on Delivery"
                            name="paymentInfo"
                            type="radio"
                            value={"Cash on Delivery"}
                            id="cashondelivery"
                            disabled={disableInput === true}
                            onChange={e => setPaymentInfo(e.target.value)}/>

                            <Form.Check
                            label="Gcash"
                            name="paymentInfo"
                            type="radio"
                            value={"Gcash"}
                            id="gcash"
                            disabled={disableInput === true}
                            onChange={e => setPaymentInfo(e.target.value)}/>
                        </Form.Group>

                </Col>
            </Row>

            <Row className="mx-3 my-4">
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
                        disabled={isActive === false}>Confirm and Checkout</Button>
                }
                </Col>
            </Row>
            </Form>
        </Card>
    )
}

export default CheckoutForm;