import { Form, Button, Row, Card, Col, CardBody, CardTitle, Image } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login({ checkLocalToken }) {
    const { user, setUser } = useContext(UserContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive ] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    });

    const handleLogin = async (e) => {
        console.log('This is handleLogin at login.js')
        e.preventDefault();

        const userDetails = {
            email: email,
            password: password
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })

            const data = await response.json();

            if (response.ok){
                localStorage.setItem('token', data.access)

                console.log(`This is LOGIN response.ok localStorage: ${localStorage.getItem('token')}`);
                console.log(`LOGIN redirecting to CHECKLOCALTOKEN`);
                checkLocalToken();
                
                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    text: 'Welcome back to JerryBee!'
                });
                setEmail('');
                setPassword('');
                setIsActive(false);
                navigate('/products');
            } else {
                Swal.fire({
                    title: 'Unsuccessful Login',
                    icon: 'error',
                    text: 'Please Try Again Later'
                });
                setEmail('');
                setPassword('');
                setIsActive('');
            };
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    };

    return (
        (user.id) ?
        <Navigate to={'/products'} />
        :
        <>
        <Row className="d-flex flex-column login">
            <Col xs="12" md="6" lg="3" className="mx-auto p-0 text-center">
                <Image className="img-fluid shadow-lg my-3 registerCard" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
            </Col>
            <Col xs="12" md="8" lg="4" className="d-flex flex-column mx-auto"> 
            <Card className="shadow-lg p-3 loginCard">
                <CardBody>
                <CardTitle className="text-center">Login</CardTitle>
                <Form className="justify-content-center mx-auto my-3" onSubmit={handleLogin}>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Passord" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        {
                            (isActive) ? 
                            <Button variant="success" className="mt-4" type="submit">Login</Button>
                            :
                            <Button variant="primary" className="mt-4" disabled>Login</Button>
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

export default Login;