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

// Used on /forms/AddReview.js
export function RatingField({ review, setReview, disableInput, HandleReviewchange }) {
    return (
        <Form.Group controlId="userReview">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
            type="select"
            name="rating"
            value={review.rating}
            onChange={e => HandleReviewchange(review, setReview, e)}
            disabled={disableInput === true}
            required> 
                <option value={0}>Select Rating</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
            </Form.Control>
        </Form.Group>
    )
}

// Used on /forms/AddReview.js
export function RatingMessageField({ review, setReview, disableInput, HandleReviewchange }) {
    return (
        <Form.Group controlId="messageReview">
            <Form.Label>Review:</Form.Label>
            <Form.Control
            as="textarea"
            name="messageReview"
            rows={3}
            placeholder="Leave your review here"
            value={review.message}
            onChange={e => HandleReviewchange(review, setReview, e)}
            disabled={disableInput === true}
            required />
        </Form.Group>
    )
}