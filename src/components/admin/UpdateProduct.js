import React, { useState } from "react";
import AddEditForm from "../../forms/AddEditForm";
import { SwalFireError, SwalFireSuccess } from "../../common/SwalFire";

function EditProduct({ product, getAllProducts }) {
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
                const title = 'Product Update Successful';
                const text = `${data.name} was updated successfully.`;
                SwalFireSuccess(title, text);
                setDisableInput(false);
            } else {
                const title = 'Failed to Update Product';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);
                setDisableInput(false);
            }
        } catch (error) {
            const title = 'Failed to Update Product';
            const text = `Please try again later. Error: ${error}`;
            SwalFireError(title, text);
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