import './App.css';
// import AddProduct from './pages/AddProduct';
import AppNavbar from "./components/layout/AppNavbar";
// import Error from "./pages/Error";
// import Home from './pages/Home';
import Login from './pages/Login';
// import Logout from './pages/Logout';
// import Products from './pages/Products';
// import Register from './pages/Register';
// import ProductView from './pages/ProductView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import { UserProvider } from './UserContext';
import { Container, Image } from 'react-bootstrap';

const Error = React.lazy(() => import('./pages/Error'));
const Home = React.lazy(() => import('./pages/Home'));
const Logout = React.lazy(() => import('./pages/Logout'));
const Products = React.lazy(() => import('./pages/Products'));
const Register = React.lazy(() => import('./pages/Register'));
const ProductView = React.lazy(() => import('./pages/ProductView'));

const App = () => {
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  const unSetUser = () => {
    localStorage.clear();
    console.log(`This is unSetUser at app.js`)
  }

  useEffect(() => {
    checkLocalToken();
  }, [])

  function checkLocalToken(){
    console.log(`This is CHECKLOCALTOKEN at app.js`);
  
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data._id){
          console.log(`This is response.ok on CHECKLOCALTOKEN at app.js and user is ${user}`)
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          })
        } else {
          setUser({
            id: null,
            isAdmin: null
          })
          console.log(`This is ELSE of response.ok on CHECKLOCALTOKEN at app.js and user is ${user}`)
        }
      })
  };

  return (
    <>
      <UserProvider value={{ user, setUser, unSetUser }}>
        <Router>
        <Suspense fallback={<Image src='https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is' className='rounded-circle suspenseImage'/>}>
          <AppNavbar />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login checkLocalToken={checkLocalToken}/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/products' element={<Products />}/>
                <Route path='/products/:productId' element={<ProductView />} />
                <Route path='*' element={<Error/>}/> 
            </Routes>
          </Suspense>
        </Router>
      </UserProvider>
    </>   
  );
}

export default App;
