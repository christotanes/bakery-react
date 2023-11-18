import { useContext, useState } from "react";
import UserContext from "../UserContext.js";
import AdminView from "./components/AdminView.js";

function Products() {
    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);

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

            if(data){
                setProducts(data);
            } else {
                console.log(`Data is null`);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    return(
        <>
        {
            (user.isAdmin) ?
            <AdminView products={products}/> : <UserView />
        }
        <h1>PRODUCTS</h1>
        </>
    )
}

export default Products;