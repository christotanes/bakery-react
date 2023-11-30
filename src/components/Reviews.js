import { Row, Col, ListGroup } from "react-bootstrap"

// From /pages/ProductView.js
function AllReviews({ productReviews }) {
    const reviewRows = productReviews.map(review => {
        if (review.showReview) {
            return <ListGroup.Item key={review._id} variant="secondary">
                        <h5 className="my-3">Rating: {review.rating}/5 stars</h5>
                        <p>{review.message}</p>
                    </ListGroup.Item>
        }
    })

    return(
        <>
            <Row className="my-5">
                <Col md={10} className="mx-auto">
                    <ListGroup >
                        { reviewRows }
                    </ListGroup>
                </Col>
            </Row>
            
        </>
        
    )
};

export default AllReviews