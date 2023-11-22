export function HandleChange(userInfo, setUserInfo, e) {
    setUserInfo({
        ...userInfo,
        [e.target.name] : e.target.value
    })
}
    
export default HandleChange;