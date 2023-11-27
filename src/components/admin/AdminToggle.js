import { Button } from "react-bootstrap";
import { SwalFireError, SwalFireSuccess } from "../../common/SwalFire";

export function AdminToggle({ user, isAdmin, getAllUsers}) {

    const toggleAdmin = async (e, userId) => {
        e.preventDefault();
        console.log(`TOGGLE ADMIN FUNCTION`);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsAdmin`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            if (response.ok) {
                getAllUsers();
                const title = 'User Set as Admin Successfully';
                const text = `${data.name} is successfully archived!`;
                SwalFireSuccess(title, text);
            } else {
                getAllUsers();
                const title = 'Failed to Set as Admin';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        };
    }

    return (
        (isAdmin === true) ? 
            <Button width="100%" 
            variant="success" 
            disabled>Admin</Button> 
            : 
            <Button 
            width="100%" 
            variant="danger" 
            onClick={e => toggleAdmin(e, user)}>Set as Admin</Button>
    )
}