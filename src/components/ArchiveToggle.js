import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';

function ArchiveToggle({ product, getAllProducts, isActive }) {

    const archive = async (e, productId) => {
        e.preventDefault();
        console.log(`ARCHIVE TOGGLE FUNCTION`);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            if (response.ok) {
                getAllProducts();
                Swal.fire({
                    title: `${data.message}`,
                    icon: 'success',
                    text: `${data.product.name} is successfully archived!`
                })
            } else {
                getAllProducts();
                Swal.fire({
                    title: 'Failed to Archive',
                    icon: 'error',
                    text: 'Please try again later.'
                })
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        };
    };

    const activate = async(e, productId) => {
        e.preventDefault();
        console.log(`ACTIVATE TOGGLE FUNCTION`);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            if(response.ok){
                getAllProducts();
                Swal.fire({
                    title: `${data.message}`,
                    icon: 'success',
                    text: `${data.product.name} is successfully activated!`
                })
            } else {
                getAllProducts();
                Swal.fire({
                    title: 'Failed to Activate',
                    icon: 'error',
                    text: 'Please try again later.'
                })
            };
        } catch (error) {
            console.error(`Error: ${error}`)
        };
    };

    return (
        <>
        {
            (isActive === true) ? <Button width="100%" variant="danger" onClick={e => (archive(e, product))}>Archive</Button> : <Button width="100%" variant="success" onClick={e => (activate(e, product))}>Activate</Button>
        }
        </>
    )
}

export default ArchiveToggle;