// Used on ProductView
export const GetProductById = async(productId, product, setProduct, setProductLeft, productReviews, setProductReviews, setError, setLoading, setIsNull) => {
    try {
        const productResponse = await fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }`);
        const reviewsResponse = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${ productId }`);

        const data = await productResponse.json();

        if(reviewsResponse.ok && reviewsResponse.status !== 204){
            const dataReviews = await reviewsResponse.json();
    
            setProductReviews(dataReviews);
            console.log(productReviews);
        } else {
            setProductReviews([]);
        }

        if (productResponse.ok) {
            setProduct(data);
            setProductLeft(data.quantity);
            console.log(product);
        } else {
            setProduct('');
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false)
        setIsNull(false)
    }
}