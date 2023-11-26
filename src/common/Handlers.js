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
export default HandleChange;