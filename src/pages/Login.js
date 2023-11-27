import { Form, Button, Row, Card, Col, CardBody, CardTitle, CardFooter, Image, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { TextInputField } from "../forms/InputFields.js";
import HandleChange from "../common/Handlers.js";
import { SwalFireError, SwalFireSuccess } from "../common/SwalFire.js";

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

                const title = 'Login Successful';
                const text = 'Welcome Back to JerryBee!'
                SwalFireSuccess(title, text);
                
                setUserInfo({
                    email: "",
                    password: ""
                })
                
                setIsActive(false);
                setDisableInput(false);
                navigate('/products');
            } else {
                const title = 'Unsuccessful Login';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);

                setUserInfo({
                    email: "",
                    password: ""
                })
                setIsActive(false);
                setDisableInput(false);
                console.log(`After unsuccessful login ${isActive}`)
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
                        name={'password'}
                        type={'password'}
                        value={userInfo.password}
                        required={true}
                        disableInput={disableInput} 
                        handleChange={e => HandleChange(userInfo, setUserInfo, e)}
                        onRegisterPassword={true}
                        />
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