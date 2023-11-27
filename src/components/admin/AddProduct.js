import React, { useState } from "react";
import AddEditForm from "../../forms/AddEditForm";
import { SwalFireSuccess, SwalFireError } from "../../common/SwalFire";

function AddProduct({ getAllProducts }) {
    const [loading, setLoading] = useState(false);

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
                const title = 'Product Added Successfully';
                const text = `${data.name} was added successfully.`
                SwalFireSuccess(title, text);

                setDisableInput(false);
            } else {
                const title = 'Failed to Add Product';
                const text = 'Please Try Again Later';
                SwalFireError(title, text);

                setDisableInput(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`)
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