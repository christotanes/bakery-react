import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useEffect } from "react";

function Logout() {
    const { unsetUser, setUser }  = useContext(UserContext)
    unsetUser()
    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null
        })
    }, [])

    return (
        <Navigate to={'login'} />
    )
}

export default Logout;