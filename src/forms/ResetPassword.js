import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

function ResetPassword() {
    const { user } = useContext(UserContext);
    const [ showModal, setShowModal ] = useState(false);
    const [ isActive, setIsActive ] = useState('')
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ disableInput, setDisableInput ] = useState(false);
    
    const handleShow = () => setShowModal(true);

    const handleClose = () => setShowModal(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableInput(true)
        console.log(`Reset Password handleSubmit async function`);

        const userNewPassword = {
            newPassword: password,
            confirmPassword: confirmPassword
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userNewPassword)
            })

            const data = await response.json();
            if (response.ok){
                console.log(data);
                Swal.fire({
                    title: 'Reset Password Success!',
                    text: `You have successfully reset your password`,
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    }
                })
                setIsActive(false);
                setPassword('');
                setConfirmPassword('');
                handleClose();
                setDisableInput(false);
            } else {
                Swal.fire({
                    title: "Reset Password Failed",
                    text: "Please try again later.",
                    imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImageError shadow-lg'
                    },
                    timer: 2500
                })
                setIsActive(false);
                setPassword('');
                setConfirmPassword('');
                handleClose();
                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
            Swal.fire({
                title: "Reset Password Failed",
                text: "Please try again later.",
                imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
                imageWidth: 250,
                imageHeight: 250,
                imageAlt: "Custom image",
                background: "#ffc800",
                customClass: {
                    image: 'swalImageError shadow-lg'
                },
                timer: 2500
            })
            setIsActive(false);
            setPassword('');
            setConfirmPassword('');
            handleClose();
            setDisableInput(false);
        }
    }

    useEffect(() => {
        if ((password !== null || confirmPassword !== null) && (password === confirmPassword) && (password.length >= 8 && password.length <= 20)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    })

    return(
        <>
        <Button variant="outline-danger w-xs-100 w-md-25 shadow ms-3" onClick={handleShow}>Reset Password</Button>

        <Modal
        size="md"
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered>

            <Modal.Header closeButton className="resetPassword">
                <Modal.Title id="contained-modal-title-vcenter" className="text-center">Reset Password </Modal.Title>
            </Modal.Header>
            <Form className="resetPassword">
            <Modal.Body className="my-3">
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={disableInput === true}/> 
                    <Form.Text muted>Must be 8-20 characters long.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={disableInput === true}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancel
                </Button>
                {isActive === true ? 
                <Button variant="primary" onClick={(e) => handleSubmit(e)} >Reset Password</Button> :
                <Button variant="primary" disabled>Reset Password</Button>}
                
            </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}
export default ResetPassword;