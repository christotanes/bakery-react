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

    const authenticate = async (e) => {
        const userData = {
        email: email,
        password: password
        };

        try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.access);
            retrieveUserDetails(data.access);
            setUser({
                access: localStorage.getItem('token')
            });
            Swal.fire({
                title:'Successful Login',
                icon: 'success',
                text: 'Welcome to JerryBee'
            })
            setEmail('');
            setPassword('');
        } else {
            console.log(data.message || "Failed to login");
        }

        } catch (error) {
        console.error("Error:", error);
        }
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
            <Navigate to="/products" />
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