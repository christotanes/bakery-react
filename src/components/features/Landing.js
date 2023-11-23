import { Row, Col, Image } from "react-bootstrap";

function Landing({ landingText }) {
    return (
        <>
        <Row className="mt-3">
            <Col md={5} className="d-flex flex-column justify-content-center align-items-center mx-auto w-100">
                <h1 className="bannerTitle">{landingText.title}</h1>
                <h4 className="bannerSubtitle">{landingText.subtitle}</h4>
            </Col>
        </Row>
        <Row className="mt-3 w-100">
            <Col className="d-flex justify-content-center">
                <Image src="https://drive.google.com/uc?id=1Xd4qs1d8JnfCEu-Mib9jpb_2h_bHQIp1" className="rounded shadow-lg bannerImage"/>
            </Col>
        </Row>
        </>
    )
}

export default Landing;