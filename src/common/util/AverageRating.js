// Used on /pages/ProductView.js
export function AverageRating( productReviews ) {
    let ratingsArray = [];
    productReviews.forEach(review => {
        ratingsArray.push(review.rating)
    });
    const sumOfRatings = ratingsArray.reduce((total, rating) => total + rating, 0,)
    return (sumOfRatings / productReviews.length)
}