import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ isActive, setIsActive ] = useState(false);

    function authenticate (e){
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            // Authorization: `Bearer ${yourBearerToken}` 
            },
            body: JSON.stringify ({
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then((data) => {
            // const token = data.access;
            if (typeof data.access !== "undefined") {

                localStorage.setItem('token', data.access);
                // The "localStorage.setItem" allows us to manipulate the browser's localStorage property to store information indefinitely to help demonstrate conditional rendering and the login and logout features.
                retrieveUserDetails(data.access);
                // Because React JS is a single page application, using the localStorage does not trigger rerendering of components and for us to be able to view the effects of this we would need to refresh our browser

                setUser({
                    access: localStorage.getItem('token')
                });

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Zuitt!"
                });

                console.log(data);
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            };
        });

        setEmail('');
        setPassword('');
    };

    const retrieveUserDetails = (token) => {
        // The token will be sent as a part of the request's header information
        // We put "Bearer" in front of the token to follow implementation standards for JWTs
        fetch('http://localhost:4000/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation across the whole application
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    }

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password])

    return (

        (user.id !== null) ?
            <Navigate to="/courses" />
            :
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter Email Address" 
                        required
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group controlId="userPasword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Enter Password" 
                        required
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    {
                        isActive

                        ? <Button variant="success" type="submit" >Login</Button>

                        : <Button variant="success" disabled>Login</Button>

                    }
            </Form>)
}

export default Login;