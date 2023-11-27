import { useState, useEffect } from "react";
import { Button, Card, CardBody, Form, Row, Col, CardTitle, Image, CardFooter, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { TextInputField } from "../forms/InputFields.js";
import HandleChange from "../common/Handlers.js";
import { SwalFireError, SwalFireSuccess } from "../common/SwalFire.js";
import 'dotenv/config'

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

            // const data = await response.json();

            if (response.ok){
                const title = 'Successful Registration';
                const text = 'Welcome to JerryBee!'
                SwalFireSuccess(title, text);
                
                setUserInfo({
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                setIsActive(false);
                navigate('/login');
                setDisableInput(false);
            } else {
                const title = 'Registration Unsuccessful';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
                
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

                        <TextInputField
                        id={'userEmail'}
                        labelPlaceholder={'Email Address'}
                        name={'email'}
                        type={'email'}
                        value={userInfo.email}
                        required={true}
                        disableInput={disableInput} 
                        handleChange={e => HandleChange(userInfo, setUserInfo, e)}
                        />

                        <TextInputField
                        id={'userPassword'}
                        labelPlaceholder={'Password'}
                        type={'password'}
                        name={'password'}
                        value={userInfo.password}
                        required={true}
                        disableInput={disableInput} 
                        handleChange={e => HandleChange(userInfo, setUserInfo, e)}
                        onRegisterPassword={true}
                        />

                        <TextInputField
                        id={'userConfirmPassword'}
                        labelPlaceholder={'Confirm Password'}
                        type={'password'}
                        name={'confirmPassword'}
                        value={userInfo.confirmPassword}
                        required={true}
                        disableInput={disableInput} 
                        handleChange={e => HandleChange(userInfo, setUserInfo, e)}
                        onRegisterPassword={false}
                        />

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