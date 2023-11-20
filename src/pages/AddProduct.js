import React, { useContext } from "react";
import UserContext from '../UserContext';
import { Navigate } from "react-router-dom";

function AddProduct() {
    const { user } = useContext(UserContext);
    return (
        <>
        {
            (user.isAdmin !== true) ? <Navigate to={"/"} /> :
            <h1>Create Product</h1>
        }
        </>
    )
};

export default AddProduct;