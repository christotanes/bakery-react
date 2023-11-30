// Used on login, register, 
export function HandleChange(userInfo, setUserInfo, e) {
    setUserInfo({
        ...userInfo,
        [e.target.name] : e.target.value
    })
}

export function HandleProductChange(productInfo, setProductInfo, e) {
    setProductInfo({
        ...productInfo,
        [e.target.name] : e.target.value
    })
}

export function HandleReviewChange(review, setReview, e) {
    setReview({
        ...review,
        [e.target.name] : e.target.value
    })
}

// Used on /pages/ProductView.js
export function handleAddToCart(productLeft, productToCart, setDisableAdd, setProductToCart, setProductLeft, setDisableMinus, e) {
    e.stopPropagation();
    if (productLeft <= 0) {
        setDisableAdd(true);
    } else {
        setProductToCart(productToCart + 1);
        setProductLeft(productLeft - 1);
        setDisableMinus(false);
    }
};

// Used on /pages/ProductView.js
export function handldeRemoveToCart(productLeft, productToCart, setDisableMinus, setProductToCart, setProductLeft, setDisableAdd, e) {
    e.stopPropagation();
    if(productToCart <=0){
        setDisableMinus(true);
    } else {
        setProductToCart(productToCart - 1);
        setProductLeft(productLeft + 1);
        setDisableAdd(false);
    }
};

export default HandleChange;