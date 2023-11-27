import { useEffect, useState } from "react";
import { Card, Table, Collapse, Button } from "react-bootstrap";
import { formatDate } from "../../common/util/FormatDate";

function UserOrders() {
    const [ userOrders, setUserOrders ] = useState([]);
    const [ isNull, setIsNull ] = useState(true)
    const [ openStates, setOpenStates ] = useState({});
    const toggleOpen = (orderId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    const MAX_RETRIES = 3;

    const fetchUserOrders = async (retryCount = 0) => {
        console.log(`userOrders function`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/myOrders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.ok && response.status !== 204){
                const data = await response.json();
                if(data) {
                    setUserOrders(data);
                    setIsNull(false);
                    console.log(`UserOrders: ${userOrders}`)
                } else if (retryCount < MAX_RETRIES) {
                    fetchUserOrders(retryCount + 1);
                } else {
                    console.log(`Data is null`);
                }
            } else {
                setUserOrders([])
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            setUserOrders([])
        }
    }

    useEffect(() => {
        fetchUserOrders();
    }, [isNull, fetchUserOrders])
    
    const ordersTable = userOrders.map((order) => (
        <tbody key={order._id}>
            <tr>
                <td className="text-center"><Button
                    onClick={() => toggleOpen(order._id)}
                    aria-controls={`collapse-text-${order._id}`}
                    aria-expanded={openStates[order._id]}>
                    Product Details
                </Button>
                </td>
                <td>{formatDate(order.purchasedOn)}</td>
                <td>₱ {order.totalAmount}</td>
                <td>{order.paymentInfo}</td>
                <td className={order.orderStatus === "completed" ? 'text-success' : 'text-danger'}>{order.orderStatus}</td>
            </tr>
            <Collapse in={openStates[order._id]}>
            <tr key={`collapse-${order._id}`} id={`collapse-text-${order._id}`}>
                <td colSpan={5}>
                    <Table>
                        <thead>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>SubTotal</th>
                        </thead>
                        <tbody>
                        {order.products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>₱ {product.price}</td>
                                <td>{product.subTotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </td>
            </tr>
        </Collapse>
        </tbody>
    ))


    return (
        <Card className="w-xs-50 w-sm-100 mx-3 shadow-lg mb-5">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Date Ordered</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                { ordersTable }
            </Table>
        </Card>
    )
}

export default UserOrders;

