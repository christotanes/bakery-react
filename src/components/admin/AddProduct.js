import React, { useState } from "react";
import Swal from "sweetalert2";
import AddEditForm from "../forms/AddEditForm";

function AddProduct({ getAllProducts }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [ isActive, setIsActive ] = useState(false);

    const addProduct = async (newProductData, closeModal) => {
        console.log('This is addProduct async Function');
        setLoading(true);
        setIsActive(false);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newProductData)
            })

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Product Added Successfully',
                    icon: 'success',
                    text: `${data.name} was added successfully.`
                })
            } else {
                Swal.fire({
                    title: 'Failed to Add Product',
                    icon: 'error',
                    text: `Please try again later.`
                })
            }
        } catch (error) {
            setError(error.message);
        } finally {
            closeModal();
            getAllProducts();
        }
    };

    return (
        <>
        <AddEditForm
            initialProduct={null}
            onSubmit={addProduct}
            isEditMode={false}
            loadingData={loading}
            isActiveData={isActive}
        />
        </>
    )
};

export default AddProduct;