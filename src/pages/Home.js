import { useEffect, useState } from "react";
import Banner from "../components/Banner.js";
import Highlights from "../components/Highlights.js";
import { Container, Row } from "react-bootstrap";

function Home() {
    const [ activeProducts, setActiveProducts ] = useState([]);
    const [ featured, setFeatured ] = useState([]);
    const [ isNull, setIsNull ] = useState(true);

    const getProducts = async () => {
        console.log(`This is getProducts at Products.js`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/active`);
            const data = await response.json();
            if (data) {
                setActiveProducts(data);
    
                let highlights = [];
                while (highlights.length < 4) {
                    let randomNum = Math.floor(Math.random() * data.length);
                    if (!highlights.includes(data[randomNum])) {
                        highlights.push(data[randomNum]);
                    }
                }
                setFeatured(highlights);
                setIsNull(false);
            } else {
                setIsNull(true);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    useEffect(() =>{
        getProducts();
        console.log(activeProducts)
    }, [isNull]);

    return (
        <>
        <Container fluid id="landing">
            <Banner activeProducts={ activeProducts } />
        </Container>
        <Container fluid id="featured" className="my-3">
            <Row className="my-3 justify-content-center">
            {featured.map((product) => (
                <Highlights key={product._id} data={product} />
            ))}
            </Row>
        </Container>
        </>
    )
}

export default Home;