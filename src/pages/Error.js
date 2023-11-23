import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {

    return (
        <>
            <Container fluid className="error">
                <Row className="w-100 h-50">
                    <Col xs={12} className="d-flex justify-content-center flex-column align-items-center">
                        <Image src="https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I" width={250} height={250} className="swalImageError shadow-lg"/>
                        <h1 className="my-3">404 not Found</h1>
                        <Link to={"/"}><h3>Home</h3></Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Error;