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
  const [ isNull, setIsNull ] = useState(null)
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  const [ cart, setCart ] = useState({
    cartId: null,
    products: [],
    totalAmount: null
  })

  const unSetUser = () => {
    localStorage.clear();
    console.log(`This is unSetUser at app.js`)
  }

  useEffect(() => {
    checkLocalToken();
  }, [isNull])

  const checkLocalToken = async () => {
    console.log(`This is CHECKLOCALTOKEN at app.js`);
    
    try {
      const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      const cartResponse = await fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const userData = await userResponse.json();
      const cartData = await cartResponse.json();
      console.log(`cartResponse.status: ${cartResponse.status}`)
      console.log(`cartData: ${cartData.cart._id}`)
      console.log(`cartData: ${cartData.cart.products}`)
      console.log(`cartData: ${cartData.cart.totalAmount}`)
      if (userResponse.ok || cartResponse.ok) {
        setUser({
          id: userData._id,
          isAdmin: userData.isAdmin
        });
        setCart({
          cartId: cartData._id,
          products: cartData.products,
          totalAmount: cartData.totalAmount
        });
      } else if (userResponse.ok && !cartData) {
        setUser({
          id: userData._id,
          isAdmin: userData.isAdmin
        });
        setCart({
          cartId: null,
          products: [],
          totalAmount: null
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
        setCart({
          cartId: null,
          products: [],
          totalAmount: null
        })
      }

      console.log(user);
      console.log(cart);
    } catch (error) {
      console.error(`Error: ${error}`)
    } finally {
      if(user.id){
        setIsNull(false);
      } else if (user.id === null || cart.id === undefined) {
        setIsNull(true);
      }
    }
  };

  return (
    <>
      <UserProvider value={{ user, setUser, unSetUser, cart, setCart }}>
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
