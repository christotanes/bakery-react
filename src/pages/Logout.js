import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useEffect } from "react";

function Logout() {
    
    const { setUser, unSetUser, setCart } = useContext(UserContext);

    unSetUser();
    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null
        })
        setCart({
            cartId: null,
            products: [],
            totalAmount: null
        })
    }, [])
    
    console.log(`This is Logout: ${localStorage.getItem('token')}`)
    return (
        <>
        <Navigate to={'/login'} />
        </>
    )
}

export default Logout;