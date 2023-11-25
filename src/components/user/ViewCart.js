import { useContext } from "react";
import UserContext from "../../UserContext";
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function ViewCart({ onCheckout }) {
    const { cart, user } = useContext(UserContext);

    return (
            (cart?.products?.length > 0) ? (
        <Card className="shadow">
            <CardHeader className="text-center">My Cart</CardHeader>
            {cart.products.map((product) => (
            <CardBody key={product.id} className="border-bottom border-warning">
                <div className="d-flex justify-content-between align-items-center">
                <Image src={product.imgLqip} width={50} height={50} className="productAdminImage"/>
                <CardTitle>{product.name}</CardTitle></div>
                <CardText className="text-end border-bottom">₱ {product.price} x {product.quantity}</CardText>
                <CardText className="text-end">₱ {product.subTotal}</CardText>
            </CardBody>
            ))}
            <h3 className="text-center text-danger font-weight-bold mt-3">₱ {cart.totalAmount}</h3>
            
            {(onCheckout === false) ? 
            <Button 
            variant="outline-primary" 
            as={Link} 
            to={`/checkout`} 
            exact 
            className="m-3"
            disabled={user.isAdmin === true}>Checkout</Button> : null}
        </Card>)
        :
        (<Card>
            <CardHeader className="text-center">My Cart</CardHeader>
            <CardBody>
                <CardText></CardText>
            </CardBody>
            <CardFooter className="text-center">Cart is empty</CardFooter>
        </Card>
        )
    )
}

export default ViewCart;