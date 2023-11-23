import { Col, Row, Image, Button } from "react-bootstrap";
import AllProducts from "./AllProducts.js";
import AllUsers from "./AllUsers.js";
import { useState } from "react";
import AllOrders from "./AllOrders.js";

function AdminView({ products, getAllProducts }) {
    const [ adminView, setAdminView ] = useState('products');

    const views = {
        products: <AllProducts products={products} getAllProducts={getAllProducts} />,
        users: <AllUsers />,
        orders: <AllOrders />
    };

    return (
        <>
        <h1 className="text-center font-weight-bold py-3"><span><Image src={"https://drive.google.com/uc?id=1V9KzKpQpmEdd6WkpigLXyls-3vphA2y5"} width={100} height={100} className="userImg me-3 rounded-circle shadow border border-primary"/></span>Admin Dashboard</h1>
        <Row className="mx-auto w-100 text-center">
            <Col md={6} className="mx-auto d-flex justify-content-between">
                <Button variant="outline-primary" className="w-50 mx-1" onClick={() => setAdminView('products')}>Products</Button>
                <Button variant="outline-primary" className="w-50 mx-1" onClick={() => setAdminView('users')}>Users</Button>
                <Button variant="outline-primary" className="w-50 mx-1" onClick={() => setAdminView('orders')}>Orders</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                {views[adminView]}
            </Col>
        </Row>
        </>
    )
}

export default AdminView;