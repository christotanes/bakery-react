import { Carousel, Image } from "react-bootstrap";

function Banner({ activeProducts }) {

    return (
        <>
        <Carousel className="pt-3 shadow-lg">
        {activeProducts.map((product) => {
            if(product.featured === true) {
                return (
            <Carousel.Item key={product._id} className="justify-content-center">
            <Image src={product.imgBanner} text={product.name} className="img-fluid rounded" style={{background: `url('${product.imgBannerLqip}'), contain`}}/>
            </Carousel.Item>)
        }})}
        </Carousel>
        </>
    )
}

export default Banner;
