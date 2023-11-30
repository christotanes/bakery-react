import { Form, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { RatingField, RatingMessageField } from "./InputFields";
import { useState } from "react";
import { HandleReviewChange } from "../common/Handlers";

// Used on ProductView and UserOrders
export function AddReview() {
    const [ review, setReview ] = useState({
        rating: 0,
        message: ""
    });
    const [ disableInput, setDisableInput ] = useState(true);


    return (
        <Modal 
        show={showModal} 
        onHide={closeModal} 
        size="md"
        backdrop="static"
        keyboard={false}>
            <ModalHeader>Give this product a review!</ModalHeader>
            <ModalTitle>This is the title</ModalTitle>
            <ModalBody>
                <Form>
                    <RatingField review={review} setReview={setReview} disableInput={disableInput} HandleReviewChange={HandleReviewChange}/>
                    <RatingMessageField review={review} setReview={setReview} disableInput={disableInput} HandleReviewChange={HandleReviewChange}/>
                </Form>
            </ModalBody>
        </Modal>
    )
}