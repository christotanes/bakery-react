import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/admin/AdminView";
import UserView from "../components/user/UserView";
import { Container } from "react-bootstrap";

function Products() {
    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);
    const [ activeProducts, setActiveProducts ] = useState([]);

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
            } else if (retryCount < MAX_RETRIES) {
                getAllProducts(retryCount + 1);
            } else {
                console.log(`Data is null`);
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
            } else if (retryCount < MAX_RETRIES) {
                getAllProducts(retryCount + 1);
            } else {
                console.log(`Data is null`);
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
    }, [user])

    return(
        <>
            
            {
                (user.isAdmin === true) ?
                <Container fluid id="products">
                <AdminView products={ products } getAllProducts={ getAllProducts } /> </Container>
                :
                <Container fluid id="products">
                <UserView activeProducts={ activeProducts } getUserProducts={ getUserProducts } /></Container>
            }
            
        </>
    )
}

export default Products;