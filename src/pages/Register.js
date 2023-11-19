import { useState, useEffect } from "react";
import { Button, Card, CardBody, Form, Row, Col, CardTitle, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassord ] = useState('');

    const [ isActive, setIsActive ] = useState(false);

    // allows to navigate user to /login upon successful registration instead of rendering the whole component
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(`This is handleRegister at register.js`)
        const userDetails = {
            email: email,
            password: password
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })

            const data = await response.json();

            if (data.user){
                Swal.fire({
                    title:'Successful Registration',
                    icon: 'success',
                    text: 'Welcome to JerryBee!'
                })
                setEmail('');
                setPassword('');
                setConfirmPassord('');
                setIsActive(false);
                navigate('/login');
            } else {
                Swal.fire({
                    title: 'Registration Unsuccessful',
                    icon: 'error',
                    text: 'Please Try Again'
                })
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    useEffect( () => {
        if ( (email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) ){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword])

    return (
        <>
            <Row className="d-flex register flex-column">
                <Col xs="12" md="6" lg="3" className="mx-auto p-0 text-center">
                <Image className="img-fluid shadow-lg my-3 registerCard" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
                </Col>
                <Col xs="12" md="8" lg="4" className="d-flex flex-column mx-auto"> 
                <Card className="shadow-lg p-3 bg-tertiary registerCard">
                    <CardBody>
                    <CardTitle className="text-center">Register</CardTitle>
                    <Form className="justify-content-center mx-auto my-3" onSubmit={handleRegister}>
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Email Address" required value={email} 
                            onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="userPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Passord" required value={password} 
                            onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="userConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={confirmPassword} 
                            onChange={e => setConfirmPassord(e.target.value)}/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            {
                                (isActive) ? 
                                <Button variant="success" className="mt-4" type="submit">Register</Button>
                                :
                                <Button variant="primary" className="mt-4" disabled>Register</Button>
                            }
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