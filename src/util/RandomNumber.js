export function getRandomProductsOfType(activeProducts, itemType) {
    let products = activeProducts.filter(product => product.type === itemType);
    let selectedProducts = [];
    for (let i = 0; i < Math.min(3, products.length); i++) {
        let randomNum;
        do{randomNum = Math.floor(Math.random() * products.length)} while (selectedProducts.includes(products[randomNum]))
        selectedProducts.push(products[randomNum])
    }
    return selectedProducts;
}

export function getAscendingProductsOfType(activeProducts, itemType) {
    let products = activeProducts.filter(product => product.type === itemType);
    return products.sort((a, b) => a.name.localeCompare(b.name));
}

