import { Form } from "react-bootstrap";

export function TextInputField ({ id, labelPlaceholder, type, name, value, required, handleChange, disableInput, onRegisterPassword  }) {
    return (
            <Form.Group controlId={id}>
            <Form.Label>{labelPlaceholder}</Form.Label>
                <Form.Control 
                    type={type}
                    name={name}
                    value={value}
                    placeholder={labelPlaceholder} 
                    required={required}
                    onChange={handleChange} 
                    disabled={disableInput === true}/> 
                    { !onRegisterPassword ? null : <Form.Text muted>Must be 8-20 characters long.</Form.Text> }
            </Form.Group>
    )
}

export function PasswordField({ userInfo, disableInput, handleChange }) {
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