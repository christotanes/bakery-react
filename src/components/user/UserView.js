import { Button, Row, Col } from "react-bootstrap";
import ViewCart from "./ViewCart";
import { getAscendingProductsOfType } from "../../util/RandomNumber.js";
import { ActiveProducCols } from "./ActiveProductCols.js";
import { useEffect, useState } from "react";

function UserView({ activeProducts }) {
    const [ cakesSorted, setCakesSorted ] = useState([]);
    const [ breadsSorted, setBreadsSorted ] = useState([]);
    const [ snacksSorted, setSnacksSorted ] = useState([]);

    const [ userView, setUserView ] = useState('all');

    useEffect(() => {
        setCakesSorted(getAscendingProductsOfType(activeProducts, "Cake"));
        setBreadsSorted(getAscendingProductsOfType(activeProducts, "Bread"));
        setSnacksSorted(getAscendingProductsOfType(activeProducts, "Snack"));
    }, [activeProducts]);

    return (
        <>  
            <Row>
                <Col className="mb-auto my-3 mx-auto d-flex justify-content-center">
                    <Button variant="primary" onClick={() => setUserView('all')} className="mx-2">All Products</Button>
                    <Button variant="primary" onClick={() => setUserView('cake')} className="mx-2">Cakes</Button>
                    <Button variant="primary" onClick={() => setUserView('bread')} className="mx-2">Breads</Button>
                    <Button variant="primary" onClick={() => setUserView('snack')} className="mx-2">Snacks</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={9} className="d-flex flex-wrap">
                { userView === 'all' && <ActiveProducCols activeProducts={activeProducts}/>}
                { userView === 'cake' && <ActiveProducCols activeProducts={cakesSorted}/>}
                { userView === 'bread' && <ActiveProducCols activeProducts={breadsSorted}/>}
                { userView === 'snack' && <ActiveProducCols activeProducts={snacksSorted}/>}
                </Col>

                <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                    <ViewCart onCheckout={false}/>
                </Col>
            </Row>
        </>
    )
}

export default UserView;