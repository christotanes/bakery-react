import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Image } from "react-bootstrap";

function ViewCart({ activeProducts }) {
    const { cart, setCart } = useContext(UserContext);
    const [ cartDetailsComplete, setCartDetailsComplete ] = useState(false)

    const getProductDetails = async () => {
        setCartDetailsComplete(false)
        try {
            let updatedProducts = await cart.products.map(product => {
            let activeProduct = activeProducts.find(p => p._id === product.productId);
                return activeProduct ? { ...product, name: activeProduct.name, imgLqip: activeProduct.imgLqip } : product;
            })
        setCart({ ...cart, products: updatedProducts });
        if(updatedProducts[0] && updatedProducts[0].name && updatedProducts[0].imgLqip){
            setCartDetailsComplete(true);
        } else {
            setCartDetailsComplete(false);
        }
        } catch (error) {
            console.error(`Error: ${error}`)
        } finally {
            if(!cart.products[0].name){
                getProductDetails();
            }
        }
    }

    useEffect(() => {
        getProductDetails();
        console.log(cart.products)
    }, [cartDetailsComplete])

    return (
        <Card>
            <CardHeader className="text-center">My Cart</CardHeader>
            <CardTitle>My Cart</CardTitle>
            {cart.products.map((product) => {
            <CardBody key={product.id}>
                <CardText><Image src={product.imgLqip} width={30} height={30} className="productAdminImage"/></CardText>
                <CardText>{product.name}</CardText>
                <CardText>{product.price}</CardText>
                <CardText>{product.quantity}</CardText>
                <CardText>{product.subTotal}</CardText>
            </CardBody>
            })}
            <CardFooter>{cart.totalAmount}</CardFooter>
        </Card>
        
    )
}

export default ViewCart;