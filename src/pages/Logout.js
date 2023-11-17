import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useEffect } from "react";

function Logout() {
    return (
        <Navigate to={'login'} />
    )
}

export default Logout;