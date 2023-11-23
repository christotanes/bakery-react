import { Col, Row, Image } from "react-bootstrap";

import AllProducts from "./AllProducts.js";

function AdminView({ products, getAllProducts }) {

    return (
        <>
        <h1 className="text-center font-weight-bold py-3"><span><Image src={"https://drive.google.com/uc?id=1V9KzKpQpmEdd6WkpigLXyls-3vphA2y5"} width={100} height={100} className="userImg me-3 rounded-circle shadow border border-primary"/></span>Admin Dashboard</h1>
        <Row>
            <Col>
                <AllProducts products={products} getAllProducts={getAllProducts}/>
            </Col>
        </Row>
        </>
    )
}

export default AdminView;