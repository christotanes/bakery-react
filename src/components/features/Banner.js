import { Carousel, Image} from "react-bootstrap";

function Banner({ activeProducts }) {

    return (
        <>
        {/* Until md breakpoint this setting is fine need to tweak for xs */}
        <Carousel className="pt-3 shadow-lg">
        {activeProducts.map((product) => {
            if(product.featured === true) {
                return (
            <Carousel.Item key={product._id} className="justify-content-center">
            <Image src={product.imgBanner} text={product.name} className="img-fluid rounded"/>
            </Carousel.Item>)
        }})}
        </Carousel>
        </>
    )
}

export default Banner;
