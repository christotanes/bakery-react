import { Button } from "react-bootstrap";
import { SwalFireError, SwalFireSuccess } from "../../common/SwalFire";
import 'dotenv/config'

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
                const title = 'Product Archived Successfully';
                const text = `${data.name} is successfully archived!`;
                SwalFireSuccess(title, text);
            } else {
                getAllProducts();
                const title = 'Failed to Archive';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
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
                const title = 'Product Activated Successfully';
                const text = `${data.name} is successfully activated!`;
                SwalFireSuccess(title, text);
            } else {
                getAllProducts();
                const title = 'Failed to Activate';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
            };
        } catch (error) {
            console.error(`Error: ${error}`)
        };
    };

    return (
        <>
        {
            (isActive === true) ? 
            <Button width="100%" variant="danger" onClick={e => (archive(e, product))}>Archive</Button> 
            : 
            <Button width="100%" variant="success" onClick={e => (activate(e, product))}>Activate</Button>
        }
        </>
    )
}

export default ArchiveToggle;