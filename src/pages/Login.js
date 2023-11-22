import { Form, Button, Row, Card, Col, CardBody, CardTitle, CardFooter, Image, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { EmailField, PasswordField } from "../forms/InputFields.js";
import HandleChange from "../util/Handlers.js";

function Login({ checkLocalToken }) {
    const { user } = useContext(UserContext);
    const [ userInfo, setUserInfo ] = useState({
        email: "",
        password: ""
    });
    const [ isActive, setIsActive ] = useState('');
    const [ disableInput, setDisableInput ] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (userInfo.email !== "" && userInfo.password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [userInfo]);

    const handleLogin = async (e) => {
        console.log(`This is handleLogin at login.js: ${userInfo.email}`)
        e.preventDefault();
        setDisableInput(true);
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            })

            const data = await response.json();

            if (response.ok){
                localStorage.setItem('token', data.access)

                console.log(`This is LOGIN response.ok localStorage: ${localStorage.getItem('token')}`);
                console.log(`LOGIN redirecting to CHECKLOCALTOKEN`);
                
                checkLocalToken();
                
                Swal.fire({
                    title: 'Login Successful',
                    text: 'Welcome back to JerryBee!',
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    }
                });
                setUserInfo({
                    email: "",
                    password: ""
                })
                setIsActive(false);
                setDisableInput(false);
                navigate('/products');
            } else {
                Swal.fire({
                    title: 'Unsuccessful Login',
                    text: 'Please Try Again Later',
                    imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImageError shadow-lg'
                    }
                });
                setUserInfo({
                    email: "",
                    password: ""
                })
                setIsActive('');
                setDisableInput(false);
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
        <Container fluid>
        <Row className="d-flex flex-column login">
            <Col xs="12" md="6" lg="3" className="mx-auto p-0 text-center">
                <Image className="img-fluid shadow-lg my-3 registerCard" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
            </Col>
            <Col xs="12" md="8" lg="4" className="d-flex flex-column mx-auto"> 
            <Card className="shadow-lg p-3 loginCard">
                <CardBody>
                <CardTitle className="text-center">Login</CardTitle>
                <Form className="justify-content-center mx-auto my-3" onSubmit={handleLogin}>
                    <EmailField disableInput={disableInput} handleChange={e => HandleChange(userInfo, setUserInfo, e)}/>
                    <PasswordField disableInput={disableInput} handleChange={e => HandleChange(userInfo, setUserInfo, e)}/>
                    <div className="d-flex justify-content-center">
                            <Button 
                            variant="success" 
                            className="mt-4" 
                            type="submit"
                            disabled={isActive === false}>Login</Button>
                    </div>
                </Form>
                <CardFooter className="text-center">Don't have an account yet? <Link to="/register" exact>Click here</Link> to register.</CardFooter>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </Container>
        </>
        )
}

export default Login;