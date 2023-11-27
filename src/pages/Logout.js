import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useEffect } from "react";

function Logout() {
    
    const { setUser, unSetUser, setCart, user, cart, setUserDetails } = useContext(UserContext);

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
        setUserDetails({
            firstName: null,
            lastName: null,
            mobileNo: 0,
            address: {
                houseNo: null,
                streetName: null,
                city: null
            },
            img: null
        })
        console.log(`This is logout, user: ${user}`)
        console.log(`This is logout, cart: ${cart}`)
        console.log(`This is localStorage: ${localStorage.getItem('token')}`)
    }, [cart, setCart, setUser, setUserDetails, user])
    
    console.log(`This is Logout: ${localStorage.getItem('token')}`)
    return (
        <>
        <Navigate to={'/login'} />
        </>
    )
}

export default Logout;