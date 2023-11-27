import { Row, Col } from "react-bootstrap";

function Landing({ landingText }) {
    return (
        <>
        <Row className="text-light d-flex flex-column justify-content-center align-items-center my-auto" style={{ height: '95vh' }}>
            <Col md={5} className="mx-auto">
                <h1 className="bannerTitle text-center border-bottom border-warning">{landingText.title}</h1>
            </Col>
            <Col md={5}>
            <h4 className="bannerSubtitle text-center">{landingText.subtitle}</h4>
            </Col>
        </Row>
        </>
    )
}

export default Landing;