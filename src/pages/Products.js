import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { Container } from "react-bootstrap";

function Products() {
    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);
    const [ activeProducts, setActiveProducts ] = useState([]);

    const [ isNull, setIsNull ] = useState(false);

    const MAX_RETRIES = 3;
    const getAllProducts = async (retryCount = 0) => {
        console.log(`This is GETALLPRODUCTS function from products.js`)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();
            console.log(`Data from getAllProducts.js: ${data}`)
            if(data){
                setProducts(data);
                setIsNull(false);
            } else if (retryCount < MAX_RETRIES) {
                getAllProducts(retryCount + 1);
            } else {
                console.log(`Data is null`);
                setIsNull(true);
            }
        } catch (error) {   
            console.error(`Error: ${error}`)
        }
    }

    const getUserProducts = async (retryCount = 0) => {
        console.log(`This is getProducts at Products.js`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/active`);
            const data = await response.json();
            console.log(`getUserProducts data: ${data}`)
            if (data) {
                setActiveProducts(data);
                setIsNull(false);
            } else if (retryCount < MAX_RETRIES) {
                getAllProducts(retryCount + 1);
            } else {
                console.log(`Data is null`);
                setIsNull(true);
            }
        } catch (error) {   
            console.error(`Error: ${error}`);
        };
    };

    useEffect(() => {
        if(user.isAdmin === true){
            getAllProducts();
        } else {
            getUserProducts();
        }
    }, [user.isAdmin])

    return(
        <>
            <Container fluid id="products">
            {
                (user.isAdmin === true) ?
                <AdminView products={ products } getAllProducts={ getAllProducts } /> 
                :
                <UserView activeProducts={ activeProducts } getUserProducts={ getUserProducts } />
            }
            </Container>
        </>
    )
}

export default Products;