import { Row, Col, Image } from "react-bootstrap";

function Landing({ landingText }) {
    return (
        <>
        <Row className="mt-3 w-100">
            <Col md={5} className="d-flex flex-column justify-content-center align-items-center mx-auto w-100">
                <h1 className="bannerTitle">{landingText.title}</h1>
                <h3 className="bannerSubtitle">{landingText.subtitle}</h3>
            </Col>
        </Row>
        <Row className="mt-3 w-100">
            <Col md={6} className="d-flex flex-column justify-content-center align-items-center mx-auto">
                <Image src="https://drive.google.com/uc?id=1T4hn_g987UD5mjm32tqotXTW11Acm-2J" className="rounded shadow-lg bannerImage img-fluid"/>
            </Col>
        </Row>
        </>
    )
}

export default Landing;