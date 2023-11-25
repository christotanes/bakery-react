import { Col, Row, Image, Button, ButtonGroup } from "react-bootstrap";
import AllProducts from "./AllProducts.js";
import AllUsers from "./AllUsers.js";
import { useState } from "react";
import AllOrders from "./AllOrders.js";

function AdminView({ products, getAllProducts }) {
    const [ adminView, setAdminView ] = useState('products');
    return (
        <>
        <h1 className="text-center font-weight-bold py-3"><span><Image src={"https://drive.google.com/uc?id=1V9KzKpQpmEdd6WkpigLXyls-3vphA2y5"} width={100} height={100} className="userImg me-3 rounded-circle shadow border border-primary"/></span>Admin Dashboard</h1>
        <Row className="mx-auto w-100 text-center">
            <Col md={6} className="mx-auto mb-3">
                <ButtonGroup aria-label="Admin View Options" size="lg" className="shadow">
                    <Button variant="primary" onClick={() => setAdminView('products')} disabled={adminView === 'products'}>Products</Button>
                    <Button variant="primary" onClick={() => setAdminView('users')} disabled={adminView === 'users'}>Users</Button>
                    <Button variant="primary" onClick={() => setAdminView('orders')} disabled={adminView === 'orders'}>Orders</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                {adminView === 'products' && <AllProducts products={products} getAllProducts={getAllProducts} />}
                {adminView === 'users' && <AllUsers />}
                {adminView === 'orders' && <AllOrders />}
            </Col>
        </Row>
        </>
    )
}

export default AdminView;