import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import AllProducts from "./AllProducts.js";

function AdminView({ products, getAllProducts }) {

    return (
        <>
        <h1 className="text-center font-weight-bold py-3">Admin Dashboard</h1>
        <Row>
            <Col>
                <AllProducts products={products} getAllProducts={getAllProducts}/>
            </Col>
        </Row>
        </>
    )
}

export default AdminView;