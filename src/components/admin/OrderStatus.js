import { Button } from "react-bootstrap";
import { SwalFireError, SwalFireSuccess } from "../../common/SwalFire";
import 'dotenv/config'

export function OrderToggle({ order, orderStatus, getAllOrders }) {

    const orderComplete = async (e, orderId) => {
        e.preventDefault();
        console.log(`TOGGLE ADMIN FUNCTION`);

        const orderIsComplete = {
            orderStatus: "complete"
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(orderIsComplete)
            })

            // const data = await response.json();

            if (response.ok) {
                getAllOrders();
                const title = 'Order Update Successfully';
                const text = `Order has been set as Complete`;
                SwalFireSuccess(title, text);
            } else {
                getAllOrders();
                const title = 'Failed to Update Order';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        };
    }

    return (
        (orderStatus === 'complete') ? 
            <Button width="100%" 
            variant="success" 
            disabled>Complete</Button> 
            : 
            <Button 
            width="100%" 
            variant="danger" 
            onClick={e => orderComplete(e, order)}>Set Order Complete</Button>
    )
}