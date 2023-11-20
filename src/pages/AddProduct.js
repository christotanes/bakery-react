import React, { useContext, useState, useEffect } from "react";
import UserContext from '../UserContext';
import { Navigate } from "react-router-dom";

function AddProduct() {
    const { user } = useContext(UserContext);
    const [ name, setName ] = useState('');
    const [ name, setName ] = useState('');
    const [ name, setName ] = useState('');
    const [ name, setName ] = useState('');
    const [ name, setName ] = useState('');
    const [ name, setName ] = useState('');

    const addProduct = async () => {
        console.log('This is addProduct async Function')
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                method: "POST",

            })
        } catch (error) {
            
        }
    }

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