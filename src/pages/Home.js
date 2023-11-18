import { useEffect, useState } from "react";
import Banner from "../components/Banner.js";
import Highlights from "../components/Highlights.js";

function Home() {
    const [ activeProducts, setActiveProducts ] = useState([]);
    const [ featured, setFeatured ] = useState([]);
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
                let numbers = [];
                let highlights = [];
                for (let i = 0; i < 5; i++){
                    let random = Math.floor(Math.random()*data.length);
                    numbers.push(random);
                    console.log(numbers);
                    highlights = data.map((product) => {
                        return (
                            <Highlights key={product[numbers[i]]._id} data={product[numbers[i]]} breakPoint={2}/>
                        )
                    })
                }
                console.log(highlights)
                setFeatured(highlights);
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
            { featured }
        </>
    )
}

export default Home;