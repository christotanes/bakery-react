import { Button, Row, Col, ButtonGroup } from "react-bootstrap";
import ViewCart from "./ViewCart";
import { getAscendingProductsOfType } from "../../util/RandomNumber.js";
import { ActiveProductCols } from "./ActiveProductCols.js";
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
                <ButtonGroup aria-label="Product Categories" size="lg" className="shadow">
                    <Button variant="primary" disabled={userView === 'all'} onClick={() => setUserView('all')}>All Products</Button>
                    <Button variant="primary" disabled={userView === 'cake'} onClick={() => setUserView('cake')}>Cakes</Button>
                    <Button variant="primary" disabled={userView === 'bread'} onClick={() => setUserView('bread')}>Breads</Button>
                    <Button variant="primary" disabled={userView === 'snack'} onClick={() => setUserView('snack')}>Snacks</Button>
                </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={9} className="d-flex flex-wrap">
                { userView === 'all' && <ActiveProductCols activeProducts={activeProducts}/>}
                { userView === 'cake' && <ActiveProductCols activeProducts={cakesSorted}/>}
                { userView === 'bread' && <ActiveProductCols activeProducts={breadsSorted}/>}
                { userView === 'snack' && <ActiveProductCols activeProducts={snacksSorted}/>}
                </Col>

                <Col xs={12} md={3} className="mb-auto my-3 mx-auto float-left">
                    <ViewCart onCheckout={false}/>
                </Col>
            </Row>
        </>
    )
}

export default UserView;