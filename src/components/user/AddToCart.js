import { useContext, useState } from "react";
import UserContext from "../../UserContext"
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddToCart({ productId, productName, productPrice, productToCart, getProductById, setProductToCartData }) {
    const { setProductToCart } = setProductToCartData;
    const [ loading, setLoading ] = useState(false);
    const { cart, setCart } = useContext(UserContext);

    const navigate = useNavigate();
    
    const addToCart = async () => {
        setLoading(true);
        const addCartData = {
            productId: productId,
            price: Number(productPrice),
            quantity: Number(productToCart)
        }
        console.log(addCartData)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(addCartData)
            })

            const data = await response.json();
            console.log(data)
            if(data){
                setCart({
                    cartId: data._id,
                    products: data.products,
                    totalAmount: data.totalAmount
                });
            } else {
                getProductById();
                setLoading(false);
                Swal.fire({
                    title: 'Unable to add to Cart',
                    icon: 'error',
                    text: 'Please try again later.',
                    timer: 2500
                })
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            Swal.fire({
                title: 'Add to Cart Success',
                icon: 'success',
                text: `${productName} was added successfully`,
                timer: 2500
            })
            getProductById();
            setProductToCart(0);
            setLoading(false);
            console.log(cart);
            navigate('/products');
        }
    }

    return (
            loading ? 
            <>
            <Button variant="primary" className="my-3 w-100" disabled>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"/>
                <span className="visually-hidden">Loading...</span>
            </Button>
            </> 
            :
            <Button variant="primary" className="my-3 w-100" onClick={(e) => addToCart(e)}>Add to Cart</Button>
    )
}

export default AddToCart;