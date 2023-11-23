import { Form } from "react-bootstrap";

export function EmailField ({ userInfo, disableInput, handleChange }) {
    return (
            <Form.Group controlId="userEmail">
            <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email"
                    name="email"
                    value={userInfo.email}
                    placeholder="Email Address" 
                    required  
                    onChange={handleChange} 
                    disabled={disableInput === true}/> 
            </Form.Group>
    )
}

export function PasswordField({ userInfo, disableInput, handleChange, onRegister }) {
    return (
        <Form.Group controlId="userPassword">
        <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                name="password"
                value={userInfo.password}
                placeholder="Password" 
                required 
                onChange={handleChange} 
                disabled={disableInput === true}/>
            { onRegister === true ? <Form.Text muted>Must be 8-20 characters long.</Form.Text> : null }
        </Form.Group>
    )
}

export function ConfirmPasswordField({ userInfo, disableInput, handleChange } ) {
    return (
        <Form.Group controlId="userConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
            type="password" 
            name="confirmPassword"
            value={userInfo.confirmPassword}
            placeholder="Confirm Password"
            required 
            onChange={handleChange} 
            disabled={disableInput === true}/>
        </Form.Group>
    )
}