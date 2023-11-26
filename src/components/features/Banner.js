import { Carousel, Image } from "react-bootstrap";
import { LazyLoad } from "../../common/util/LazyLoad";

function Banner({ activeProducts }) {
    return (
        <>
        <Carousel className="pt-3 shadow-lg aboveLanding ms-auto">
        {activeProducts.map((product) => {
            if(product.featured === true) {
                return (
            <Carousel.Item key={product._id} className="justify-content-center">
            <LazyLoad image={product.imgBanner} imageLqip={product.imgBannerLqip} alt={product.name} width={`100%`} height={`auto`}/>
            </Carousel.Item>)
        }})}
        </Carousel>
        </>
    )
}

export default Banner;
