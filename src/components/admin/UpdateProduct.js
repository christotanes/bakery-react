import React, { useState } from "react";
import Swal from "sweetalert2";
import AddEditForm from "../forms/AddEditForm";

function EditProduct({ product, getAllProducts }) {
    const [error, setError] = useState(null);
    const [ loading, setLoading] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ disableInput, setDisableInput ] = useState(false);

    const editProduct = async (productData, closeModal) => {
        console.log('This is editProduct async Function');
        setLoading(true);
        setIsActive(false);
        setDisableInput(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(productData)
            })

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Product Update Successful',
                    text: `${data.name} was updated successfully.`,
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
                    title: 'Failed to Update Product',
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
            Swal.fire({
                title: 'Failed to Update Product',
                text: `Please try again later. Error: ${error}`,
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
        } finally {
            setDisableInput(false);
            closeModal()
            getAllProducts()
        }
    };

    return (
        <>
            <AddEditForm
                    initialProduct={product}
                    onSubmit={editProduct}
                    isEditMode={true}
                    loadingData={loading}
                    isActiveData={isActive}
                    disableInputData={disableInput}
                />
        </>
    )
};

export default EditProduct;