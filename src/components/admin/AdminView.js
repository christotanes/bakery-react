import { useState } from "react";
import { Col, Row, Table, Image, Button, Collapse } from "react-bootstrap";
import ArchiveToggle from "./ArchiveToggle.js";
import UpdateProduct from "./UpdateProduct"
import AddProduct from "./AddProduct.js";

function AdminView({ products, getAllProducts }) {
    const [openStates, setOpenStates] = useState({});
    const toggleOpen = (productId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [productId]: !prevStates[productId]
        }));
    };
    const productRows = products.map((product) => (
        <tbody key={product._id}>
            <tr>
                <td colSpan={7}><h5>{product.name}</h5></td>
                <td><Image src={product.imgLqip} width={30} height={30} className="productAdminImage"/></td>
                <td><Image src={product.imgBannerLqip} width={60} height={30} className="productAdminImage"/></td>
                
            </tr>
            <tr>
                <td><Button
                    onClick={() => toggleOpen(product._id)}
                    aria-controls={`collapse-text-${product._id}`}
                    aria-expanded={openStates[product._id]}>
                    click
                </Button></td>
                <td>{product._id}</td>
                <td>{product.description}</td>
                <td>PhP {product.price}</td>
                <td>{product.quantity}</td>
                <td className={product.isActive ? 'text-success' : 'text-danger'}>{product.isActive ? 'Available' : 'Unavailable'}</td>
                <td><UpdateProduct product={ product } getAllProducts={ getAllProducts }/></td>
                <td>Featured</td>
                <td><ArchiveToggle product={product._id} getAllProducts={getAllProducts} isActive={product.isActive}/></td>
            </tr>
            <Collapse in={openStates[product._id]}>
                <tr key={`collapse-${product._id}`} id={`collapse-text-${product._id}`}>
                    <td colSpan={9}>
                    <tr>
                        <td className="font-weight-bold">Type</td>
                        <td className="font-weight-bold">Size</td>
                        <td className="font-weight-bold">Allergens</td>
                        <td className="font-weight-bold">Weight</td>
                        <td className="font-weight-bold">Delivery</td>
                        <td className="font-weight-bold">Flavors</td>
                        <td className="font-weight-bold" colSpan={2}>Best Before</td>
                        <td className="font-weight-bold">Vegetarian</td>
                    </tr>
                    <tr>
                        <td>{product.type}</td>
                        <td>{product.size}</td>
                        <td>{product.allergens}</td>
                        <td>{product.weight}</td>
                        <td className={product.deliveryAvailable ? 'text-success' : 'text-danger'}>{product.deliveryAvailable ? 'Available' : 'Unavailable'}</td>
                        <td>{product.flavors}</td>
                        <td colSpan={2}>{product.bestBefore}</td>
                        <td className={product.vegetarian ? 'text-success' : 'text-danger'}>{product.vegetarian ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Img Link:</td>
                        <td colSpan={8}>{product.img}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Img LQIP Link:</td>
                        <td colSpan={8}>{product.imgLqip}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Img Banner Link:</td>
                        <td colSpan={8}>{product.imgBanner}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Img LQIP Link:</td>
                        <td colSpan={8}>{product.imgBannerLqip}</td>
                    </tr>
                    </td>
                </tr>
            </Collapse>
        </tbody>
    ));
    console.log(productRows)

    return (
        <>
        <h1 className="text-center font-weight-bold py-3">Admin Dashboard</h1>
        <Row>
            <Col>
                <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th colSpan={6} className="font-weight-bold">Name</th>
                                <th><AddProduct getAllProducts={ getAllProducts }/></th>
                                <th>Image</th>
                                <th>Image Banner</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Active</th>
                                <th colSpan={3} className="text-center">Actions</th>
                            </tr>
                        </thead>
                        { productRows }
                </Table>
            </Col>
        </Row>
        </>
    )
}

export default AdminView;