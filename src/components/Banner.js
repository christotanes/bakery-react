import { useEffect, useState } from "react";
import { Carousel, Image} from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner({ activeProducts }) {

    const [ featured, setFeatured ] = useState([]);

    return (
        <>
        <Carousel className="mx-auto d-flex justify-content-center">
        {activeProducts.map((product) => {
            if(product.featured === true) {
                return (
            <Carousel.Item key={product._id} className="justify-content-center">
            <Image src={product.imgBanner} text={product.name} className="justify-content-center" height="400" />
                <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>PhP {product.price}</p>
                <Link to={`/products/${product._id}`}>Details</Link>
                </Carousel.Caption>
            </Carousel.Item>)
        }})}
        </Carousel>
        </>
    )
}

export default Banner;
{/* <Row>
                <Col xs={{order:'last'}} md={{order:'first'}} lg={6} className="pt-5 ps-3 my-auto bannerText">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
                    <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <Button as={Link} to="/register" exact>
                        Sign Up
                    </Button>
                    <Button as={Link} to="/login" exact>
                        Login
                    </Button>
                    </div>
                </Col>
                <Col xs={{order:'first'}} md={{order:'last'}} lg={5} className="bannerImage">
                    <Image className="align-items-center img-fluid shadow-lg my-3" src="https://drive.google.com/uc?id=1P96tY_C3v8kNqjmazdtpSR_XiUycX4YF" alt="" width="720" rounded />
                </Col>
            </Row> */}