import { Row, Col, Image } from "react-bootstrap";

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
        {/* <Row className="mt-3 w-100">
            <Col className="d-flex justify-content-center">
                <Image src="https://drive.google.com/uc?id=1Xd4qs1d8JnfCEu-Mib9jpb_2h_bHQIp1" className="rounded shadow-lg bannerImage"/>
            </Col>
        </Row> */}
        </>
    )
}

export default Landing;