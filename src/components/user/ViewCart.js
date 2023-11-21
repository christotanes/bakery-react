import { useContext } from "react";
import UserContext from "../../UserContext";
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function ViewCart() {
    const { cart} = useContext(UserContext);

    return (
            (cart?.products?.length > 0) ? (
        <Card className="shadow">
            <CardHeader className="text-center">My Cart</CardHeader>
            {cart.products.map((product) => (
            <CardBody key={product.id}>
                <div className="d-flex justify-content-between align-items-center">
                <Image src={product.imgLqip} width={50} height={50} className="productAdminImage"/>
                <CardTitle>{product.name}</CardTitle></div>
                <CardText className="text-end">PhP {product.price} x {product.quantity}</CardText>
                <CardText className="text-end">PhP {product.subTotal}</CardText>
            </CardBody>
            ))}
            <CardFooter className="text-end">PhP{cart.totalAmount}</CardFooter>

            <Button variant="outline-primary" as={Link} to={`/checkout`} exact className="m-3">Checkout</Button>
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