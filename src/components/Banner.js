import { Button, Row, Image, Col } from "react-bootstrap";

function Banner() {
    return (
        <>
            <Row className="mt-5">
                <Col xs={{order:'last'}} md={{order:'first'}} lg={6} className="pt-5">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
                    <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <Button data-bs-toggle="modal" data-bs-target="#signUp">
                        Sign Up
                    </Button>
                    <Button data-bs-toggle="modal" data-bs-target="#login">
                        Login
                    </Button>
                    </div>
                </Col>
                <Col xs={{order:'first'}} md={{order:'last'}} lg={5} className="shadow-lg">
                    <Image className="align-items-center img-fluid" src="https://drive.google.com/uc?id=1P96tY_C3v8kNqjmazdtpSR_XiUycX4YF" alt="" width="720" rounded />
                </Col>
            </Row>
        </>
    )
}

export default Banner;