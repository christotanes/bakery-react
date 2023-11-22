import React, { useState } from "react";
import Swal from "sweetalert2";
import AddEditForm from "../forms/AddEditForm";

function AddProduct({ getAllProducts }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [ isActive, setIsActive ] = useState(false);
    const [ disableInput, setDisableInput ] = useState(false);

    const addProduct = async (newProductData, closeModal) => {
        console.log('This is addProduct async Function');
        setLoading(true);
        setIsActive(false);
        setDisableInput(true);

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
                    text: `${data.name} was added successfully.`,
                    imageUrl: "https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImage shadow-lg'
                    }
                })
                setDisableInput(false);
            } else {
                Swal.fire({
                    title: 'Failed to Add Product',
                    text: `Please try again later.`,
                    imageUrl: "https://drive.google.com/uc?id=1np1kEmk_C5Mn6c64uvWPak8OcfIzhS7I",
                    imageWidth: 250,
                    imageHeight: 250,
                    imageAlt: "Custom image",
                    background: "#ffc800",
                    customClass: {
                        image: 'swalImageError shadow-lg'
                    },
                    timer: 2500
                })
                setDisableInput(false);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setDisableInput(false);
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
            disableInputData={disableInput}
        />
        </>
    )
};

export default AddProduct;