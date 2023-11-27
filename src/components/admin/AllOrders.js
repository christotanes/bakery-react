import { useEffect, useState } from "react";
import { formatDate } from "../../common/util/FormatDate";
import { Table, Button, Collapse, Card } from "react-bootstrap";
import { OrderToggle } from "./OrderStatus";

function AllOrders() {
    const [ allOrders, setAllOrders ] = useState([]);

    const [ isNull, setIsNull ] = useState(true)
    const [ openStates, setOpenStates ] = useState({});
    const toggleOpen = (orderId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [orderId]: !prevStates[orderId]
        }));
    };

    const getAllOrders = () => {
        setIsNull(true);
        fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            setAllOrders(data);
            setIsNull(false);
            console.log(allOrders)
        })
    }

    useEffect(() => {
        getAllOrders();
    }, [isNull, getAllOrders])

    const allOrdersTable = allOrders.map((order) => (
        <tbody key={order._id}>
            <tr>
                <td><Button
                    onClick={() => toggleOpen(order._id)}
                    aria-controls={`collapse-text-${order._id}`}
                    aria-expanded={openStates[order._id]}>
                    Product Details
                </Button>
                </td>
                <td>{order.userId}</td>
                <td>{formatDate(order.purchasedOn)}</td>
                <td>₱ {order.totalAmount}</td>
                <td>{order.paymentInfo}</td>
                <td className={order.orderStatus === "complete" ? 'text-success text-center' : 'text-danger text-center'}>{order.orderStatus}</td>
                <td className="text-center"><OrderToggle order={order._id} orderStatus={order.orderStatus} getAllOrders={getAllOrders}/></td>
            </tr>
            <Collapse in={openStates[order._id]}>
            <tr key={`collapse-${order._id}`} id={`collapse-text-${order._id}`}>
                <td colSpan={7}>
                    <Table>
                        <thead>
                            <th colSpan={2}>Product Id</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th colSpan={3}>Added On</th>
                        </thead>
                        <tbody>
                        {order.products.map((product) => (
                            <tr key={product.productId}>
                                <td colSpan={2}>{product.productId}</td>
                                <td>{product.quantity}</td>
                                <td>₱ {product.price}</td>
                                <td colSpan={3}>{formatDate(product.addedOn)}</td>
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
        <Card className="w-xs-50 w-sm-100 mx-3 shadow-lg my-5">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>User Id</th>
                        <th>Date Ordered</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                { allOrdersTable }
            </Table>
        </Card>
    )
};

export default AllOrders;