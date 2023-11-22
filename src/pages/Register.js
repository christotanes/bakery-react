import { useState, useEffect } from "react";
import { Button, Card, CardBody, Form, Row, Col, CardTitle, Image, CardFooter, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ConfirmPasswordField, EmailField, PasswordField } from "../forms/InputFields.js";
import HandleChange from "../util/Handlers.js";

function Register() {
    const [ userInfo, setUserInfo ] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [ isActive, setIsActive ] = useState(false);
    const [ disableInput, setDisableInput ] = useState(false);

    // allows to navigate user to /login upon successful registration instead of rendering the whole component
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setDisableInput(true);
        console.log(`This is handleRegister at register.js`)

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            })

            const data = await response.json();

            if (data.user){
                Swal.fire({
                    title:'Successful Registration',
                    text: 'Welcome to JerryBee!',
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    }
                })
                setUserInfo({
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                setIsActive(false);
                navigate('/login');
                setDisableInput(false);
            } else {
                Swal.fire({
                    title: 'Registration Unsuccessful',
                    text: 'Please Try Again',
                    imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImageError shadow-lg'
                    }
                })
                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    useEffect( () => {
        if ( (userInfo.email !== "" && userInfo.password !== "" && userInfo.confirmPassword !== "") && (userInfo.password === userInfo.confirmPassword) && (userInfo.password.length >= 8 && userInfo.password.length <= 20)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [userInfo])

    return (
        <>
        <Container fluid>
            <Row className="d-flex register flex-column">
                <Col xs="12" md="6" lg="3" className="mx-auto p-0 text-center">
                <Image className="img-fluid shadow-lg my-3 registerCard" src="https://drive.google.com/uc?id=1tYh9q_ii39cyotTRzn8u_TAEJCiu-uhg" alt="" width="200" roundedCircle />
                </Col>
                <Col xs="12" md="8" lg="4" className="d-flex flex-column mx-auto"> 
                <Card className="shadow-lg p-3 bg-tertiary registerCard">
                    <CardBody>
                    <CardTitle className="text-center">Register</CardTitle>
                    <Form className="justify-content-center mx-auto my-3" onSubmit={handleRegister}>

                        <EmailField disableInput={disableInput} handleChange={e => HandleChange(userInfo, setUserInfo, e)}/>
                        <PasswordField disableInput={disableInput} onRegister={true} handleChange={e => HandleChange(userInfo, setUserInfo, e)}/>
                        <ConfirmPasswordField disableInput={disableInput} handleChange={e => HandleChange(userInfo, setUserInfo, e)}/>

                        <div className="d-flex justify-content-center">
                                <Button 
                                variant="success" 
                                className="mt-4" 
                                type="submit" 
                                disabled={isActive === false}>Register</Button>

                        </div>
                    </Form>
                    <CardFooter className="text-center">Already have an account? <Link to="/login" exact>Click here</Link> to log in.</CardFooter>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Register;