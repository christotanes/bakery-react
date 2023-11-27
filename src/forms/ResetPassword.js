import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserContext from "../UserContext";
import { SwalFireError, SwalFireSuccess } from "../common/SwalFire";
import { TextInputField } from "./InputFields";
import HandleChange from "../common/Handlers";

function ResetPassword() {
    const { user } = useContext(UserContext);
    const [ showModal, setShowModal ] = useState(false);
    const [ isActive, setIsActive ] = useState('')
    const [ userInfo, setUserInfo ] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [ disableInput, setDisableInput ] = useState(false);
    
    const handleShow = () => setShowModal(true);

    const handleClose = () => setShowModal(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableInput(true)
        console.log(`Reset Password handleSubmit async function`);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userInfo)
            })

            const data = await response.json();
            if (response.ok){
                console.log(data);
                const title = 'Reset Password Success!';
                const text = 'You have successfully reset your password'
                SwalFireSuccess(title, text);
                
                setIsActive(false);
                setUserInfo({
                    password: "",
                    confirmPassword: ""
                })
                handleClose();
                setDisableInput(false);
            } else {
                const title = 'Reset Password Failed';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);

                setIsActive(false);
                setUserInfo({
                    password: "",
                    confirmPassword: ""
                })
                handleClose();
                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
            const title = 'Reset Password Failed';
            const text = 'Please Try Again Later';
            SwalFireError(title, text);

            setIsActive(false);
            setUserInfo({
                password: "",
                confirmPassword: ""
            })
            handleClose();
            setDisableInput(false);
        }
    }

    useEffect(() => {
        if ((userInfo.password !== null || userInfo.confirmPassword !== null) && (userInfo.password === userInfo.confirmPassword) && (userInfo.password.length >= 8 && userInfo.password.length <= 20)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [userInfo.password, userInfo.confirmPassword])

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
                        id={'confirmPassword'}
                        labelPlaceholder={'Confirm Password'}
                        type={'password'}
                        name={'confirmPassword'}
                        value={userInfo.confirmPassword}
                        required={true}
                        disableInput={disableInput} 
                        handleChange={e => HandleChange(userInfo, setUserInfo, e)}
                        onRegisterPassword={false}
                        />
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