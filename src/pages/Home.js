import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "../components/features/Banner";
import Highlights from "../components/features/Highlights";
import Landing from "../components/features/Landing";
import { getRandomProductsOfType } from "../common/util/RandomNumber.js";

function Home() {
    const [ activeProducts, setActiveProducts ] = useState([]);
    const [ cakesFeatured, setCakesFeatured ] = useState([]);
    const [ breadsFeatured, setBreadsFeatured ] = useState([]);
    const [ snacksFeatured, setSnacksFeatured ] = useState([]);

    const [ isNull, setIsNull ] = useState(true);

    const getProducts = async () => {
        console.log(`This is getProducts at Products.js`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/active`);
            const data = await response.json();
            if (response.ok) {
                setActiveProducts(data);
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
    }, [isNull, getProducts]);

    useEffect(() => {
        if (activeProducts.length > 0) {
            setCakesFeatured(getRandomProductsOfType(activeProducts, "Cake"));
            setBreadsFeatured(getRandomProductsOfType(activeProducts, "Bread"));
            setSnacksFeatured(getRandomProductsOfType(activeProducts, "Snack"));
        }
    }, [activeProducts]);

    const landingText = {
        title: "Welcome to JerryBee!",
        subtitle: "Where Sweet Moments and Delightful Flavors Come to Life!"
    };

    return (
        <>
        <Container fluid id="landing" className="overflow-hidden">
            <Landing landingText={ landingText }/>
        </Container>
        <Container id="banner">
            <Banner activeProducts={ activeProducts } />
        </Container>
        
        <Container id="featured" className="my-3">
            <section id="cakes">
            <Row className="pt-3">
                <Col>
                    <h3>Add a Dash of Delight to Your Celebrations with Our Exquisite Cake Collection!</h3>
                </Col>
            </Row>
            <Row className="mt-3">
                {cakesFeatured.map(product => (
                    <Highlights key={product._id} data={product} />
                ))}
            </Row>
            </section>

            <section id="breads">
            <Row className="pt-3">
                <Col>
                    <h3>Start Your Day with a Smile: Our Breads Bring the Warmth of Sunrise to Your Mornings!</h3>
                </Col>
            </Row>
            <Row className="my-3">
            {breadsFeatured.map((product) => (
                    <Highlights key={product._id} data={product} />
                ))}
            </Row>
            </section>

            <section id="snacks">
                <Row className="py-3">
                    <Col>
                        <h3>Delight in Fun-Filled Snacking Moments with the Kids with Our Joyful Assortment of Snacks!</h3>
                    </Col>
                </Row>
                <Row className="my-3">
                {snacksFeatured.map((product) => (
                    product.type === "Snack" && <Highlights key={product._id} data={product} />
                    ))}
                </Row>
            </section>
            
        </Container>
        </>
    )
}

export default Home;