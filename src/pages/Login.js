import { Form, Button, Row, Card, Col, CardBody, CardTitle, Image } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    return (
        <Row className="d-flex justify-content-center align-items-center login flex-column">
            <Col xs="3" className="m-0 p-0 text-center">
                <Image className="img-fluid shadow-lg my-3" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
            </Col>
            <Col xs="4" className="d-flex flex-column my-auto mx-auto"> 
            <Card className="shadow-lg p-3">
                <CardBody>
                <CardTitle className="text-center">Login</CardTitle>
                <Form className="justify-content-center mx-auto my-3">
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" required/>
                    </Form.Group>
                    <Form.Group controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Passord" required/>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="success" className="mt-4">Login</Button>
                    </div>
                </Form>
                </CardBody>
            </Card>
            </Col>
        </Row>
        )
}

export default Login;