import React, { useState } from "react";
import Swal from "sweetalert2";
import AddEditForm from "../forms/AddEditForm";

function EditProduct({ product, getAllProducts }) {
    const [error, setError] = useState(null);
    const [ loading, setLoading] = useState(false);
    const [ isActive, setIsActive ] = useState(false);

    const editProduct = async (productData, closeModal) => {
        console.log('This is editProduct async Function');
        setLoading(true);
        setIsActive(false);

        // const editProductData = {
        //     name: name,
        //     description: description,
        //     type: type,
        //     size: size,
        //     quantity: quantity,
        //     price: price,
        //     allergens: allergens,
        //     weight: weight,
        //     deliveryAvailable: deliveryAvailable,
        //     flavors: flavors,
        //     bestBefore: bestBefore,
        //     vegetarian: vegetarian,
        //     img: img,
        //     imgLqip: imgLqip,
        //     imgBanner: imgBanner,
        //     imgBannerLqip: imgBannerLqip
        // }

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
                    icon: 'success',
                    text: `${data.name} was updated successfully.`
                })
            } else {
                Swal.fire({
                    title: 'Failed to Update Product',
                    icon: 'success',
                    text: `Please try again later.`
                })
            }
        } catch (error) {
            setError(error.message);
            Swal.fire({
                title: 'Failed to Update Product',
                icon: 'error',
                text: `Please try again later. Error: ${error}`
            })
        } finally {
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
                />
        </>
    )
};

export default EditProduct;