import ArchiveToggle from "./ArchiveToggle.js";
import UpdateProduct from "./UpdateProduct"
import AddProduct from "./AddProduct.js";
import { Table, Image, Button, Collapse } from "react-bootstrap";
import { useState } from "react";

function AllProducts({ products, getAllProducts}) {
    const [openStates, setOpenStates] = useState({});
    const toggleOpen = (productId) => {
        setOpenStates(prevStates => ({
            ...prevStates,
            [productId]: !prevStates[productId]
        }));
    };
    const [ isOpen, setIsOpen ] = useState(false);
    function handleCollapse (e) {
        e.preventDefault();
        isOpen === false ?
        setIsOpen(true) : setIsOpen(false);
    };

    const productRows = products.map((product) => (
        <tbody key={product._id}>
            <tr>
                <td colSpan={5}><h5>{product.name}</h5></td>
                <td className="text-center"><Image src={product.imgLqip} width={30} height={30} className="productAdminImage"/></td>
                <td className="text-center" colSpan={3}><Image src={product.imgBannerLqip} width={60} height={30} className="productAdminImage"/></td>
                
            </tr>
            <tr>
                <td className="text-center">
                    <Button
                    onClick={(e) => ((toggleOpen(product._id)), (handleCollapse(e)))}
                    aria-controls={`collapse-text-${product._id}`}
                    aria-expanded={openStates[product._id]}>
                    {isOpen === false ? "Open" : "Close"}
                    </Button>
                </td>
                <td>{product._id}</td>
                <td style={{width: '40%'}}>{product.description}</td>
                <td className="text-center">₱ {product.price}</td>
                <td className="text-center">{product.quantity}</td>
                <td className={product.isActive ? 'text-success text-center' : 'text-danger text-center'}>{product.isActive ? 'Available' : 'Unavailable'}</td>
                <td className="text-center"><UpdateProduct product={ product } getAllProducts={ getAllProducts }/></td>
                <td className={product.featured ? 'text-success text-center' : 'text-danger text-center'}>{product.featured ? 
                <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>Featured</>
                : 
                'Standard'}</td>
                <td className="text-center"><ArchiveToggle product={product._id} getAllProducts={getAllProducts} isActive={product.isActive}/></td>
            </tr>
            <Collapse in={openStates[product._id]}>
                <tr key={`collapse-${product._id}`} id={`collapse-text-${product._id}`}>
                    <td colSpan={9}>
                    <Table>
                        <thead>
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
                        </thead>

                        <tbody>
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
                        </tbody>

                        <thead>
                            <td>Image</td>
                            <td colSpan={8}>URL Link</td>
                        </thead>

                        <tbody>
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
                        </tbody>
                        
                        </Table>
                    </td>
                </tr>
            </Collapse>
        </tbody>
    ));
    console.log(productRows)

    return (
        <>
        <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th colSpan={3} className="font-weight-bold">Name</th>
                                <th className="text-center" colSpan={2}><AddProduct getAllProducts={ getAllProducts }/></th>
                                <th className="text-center">Image</th>
                                <th className="text-center" colSpan={3}>Image Banner</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Description</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Active</th>
                                <th colSpan={3} className="text-center">Actions</th>
                            </tr>
                        </thead>
                        { productRows }
        </Table>
        </>
    )
}

export default AllProducts;