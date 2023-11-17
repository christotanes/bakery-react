import { useState } from "react";
import { Button, Card, CardBody, Form, Row, Col, CardTitle, Image } from "react-bootstrap";


function Register() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassord ] = useState('');

    const [ isActive, setIsActive ] = useState(false);


    return (
        <>
            <Row className="d-flex justify-content-center align-items-center register flex-column">
                <Col xs="3" className="m-0 p-0 text-center">
                <Image className="img-fluid shadow-lg my-3" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
                </Col>
                <Col xs="5" className="d-flex flex-column mx-auto"> 
                <Card className="shadow-lg p-3 bg-tertiary">
                    <CardBody>
                    <CardTitle className="text-center">Register</CardTitle>
                    <Form className="justify-content-center mx-auto my-3">
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Email Address" required/>
                        </Form.Group>
                        <Form.Group controlId="userPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Passord" required/>
                        </Form.Group>
                        <Form.Group controlId="userConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="success" className="mt-4">Register</Button>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </>
    )
}

export default Register;