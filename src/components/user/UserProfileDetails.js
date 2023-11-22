import { CardSubtitle, CardTitle, Col, Row } from "react-bootstrap";
import UserContext from "../../UserContext";
import { useContext } from "react";

function UserProfileDetails() {
    const { userDetails } = useContext(UserContext);
    const { firstName, lastName, mobileNo, address, img } = userDetails;

    return (
            <>
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>First Name:</CardTitle>
                    <CardSubtitle className="ms-3">{firstName}</CardSubtitle>
                </Col>
                <Col md={6}>
                    <CardTitle>Last Name:</CardTitle>
                    <CardSubtitle className="ms-3">{lastName}</CardSubtitle>
                </Col>
            </Row>
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>Mobile No:</CardTitle>
                    <CardSubtitle className="ms-3">{mobileNo}</CardSubtitle>
                </Col>
            </Row>
                
            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>House No:</CardTitle>
                    <CardSubtitle className="ms-3">{address?.houseNo || `Not Provided`}</CardSubtitle>
                </Col>
                <Col md={6}>
                    <CardTitle>Street Name:</CardTitle>
                    <CardSubtitle className="ms-3">{address?.streetName || `Not Provided`}</CardSubtitle>
                </Col>
            </Row>

            <Row className="mx-3 mt-3">
                <Col md={6}>
                    <CardTitle>City Name:</CardTitle>
                    <CardSubtitle className="ms-3">{address?.city || `Not Provided`}</CardSubtitle>
                </Col>
            </Row>

            <Row className="m-3">
                <Col md={6} className="mx-auto">
                    <CardTitle>Profile Pic Link:</CardTitle>
                    <CardSubtitle className="ms-3">{img || `Not Provided`}</CardSubtitle>
                </Col>
            </Row>

            </>
    )
}

export default UserProfileDetails;