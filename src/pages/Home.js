import { useEffect, useState } from "react";
import Banner from "../components/Banner.js";
import Highlights from "../components/Highlights.js";

function Home() {
    const [ activeProducts, setActiveProducts ] = useState([]);
    const [ isNull, setIsNull ] = useState(false);

    const getProducts = async () => {
        console.log(`This is getProducts at Products.js`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/active`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const data = await response.json();

            if (data) {
                setActiveProducts(data);
                console.log(activeProducts)
                setIsNull(false);
            } else {
                console.log(`getProduct data returned Null`)
                setIsNull(true);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    useEffect(() =>{
        getProducts();
    }, [isNull]);

    return (
        <>
            <Banner activeProducts={ activeProducts } />
            <Highlights activeProducts={ activeProducts } />
        </>
    )
}

export default Home;