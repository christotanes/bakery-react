import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { Container } from "react-bootstrap";

function Products() {
    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);
    const [ isNull, setIsNull ] = useState(false);

    const getAllProducts = async () => {
        console.log(`This is GETALLPRODUCTS function from products.js`)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();
            console.log(`Data from Products.js: ${data}`)
            if(data){
                setProducts(data);
                setIsNull(false);
            } else {
                console.log(`Data is null`);
                setIsNull(true);
            }
        } catch (error) {   
            console.error(`Error: ${error}`)
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [isNull])
    return(
        <>
            <Container fluid id="products">
            {
                (user.isAdmin) ?
                <AdminView products={ products } exact/> : <UserView products={ products } /> 
            }
            </Container>
        </>
    )
}

export default Products;