import './App.css';
import AppNavbar from "./components/layout/AppNavbar";
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import { UserProvider } from './UserContext';
import { Image } from 'react-bootstrap';

const Checkout = React.lazy(() => import('./pages/Checkout'))
const Error = React.lazy(() => import('./pages/Error'));
const Home = React.lazy(() => import('./pages/Home'));
const Logout = React.lazy(() => import('./pages/Logout'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductView = React.lazy(() => import('./pages/ProductView'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Register = React.lazy(() => import('./pages/Register'));

const App = () => {
  const [ isNull, setIsNull ] = useState(null)
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  const [ userDetails, setUserDetails ] = useState({
    firstName: null,
    lastName: null,
    mobileNo: 0,
    address: {
      houseNo: null,
      streetName: null,
      city: null
    },
    img: null
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
    console.log(isNull)
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

      if (cartResponse.ok && cartResponse.status !== 204) {
        const cartData = await cartResponse.json();
        setCart({
            cartId: cartData._id,
            products: cartData.products,
            totalAmount: cartData.totalAmount
        });
        console.log(`cartData: ${cartData._id}`)
        console.log(`cartData: ${cartData.products}`)
        console.log(`cartData: ${cartData.totalAmount}`)
      } else {
          // Handle the case where cartResponse is not OK or has no content
          setCart({
              cartId: null,
              products: [],
              totalAmount: null
          });
      }

      console.log(`cartResponse.status: ${cartResponse.status}`)
      console.log(`userResponse.status: ${userResponse.status}`)
      if (userResponse.ok) {
        setUser({
          id: userData._id,
          isAdmin: userData.isAdmin
        });
        
        setUserDetails({
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobileNo: userData.mobileNo,
          address: {
            houseNo: userData.address?.houseNo || '',
            streetName: userData.address?.streetName || '',
            city: userData.address?.city || ''
          },
          img: userData.img
        })
      } else {
        setUser({
          id: userData._id,
          isAdmin: userData.isAdmin
        });

        setUserDetails({
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobileNo: userData.mobileNo,
          address: {
            houseNo: userData.address?.houseNo || '',
            streetName: userData.address?.streetName || '',
            city: userData.address?.city || ''
          },
          img: userData.img
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
      <UserProvider value={{ user, setUser, unSetUser, cart, setCart, userDetails, setUserDetails }}>
        <Router>
        <Suspense fallback={<Image src='https://drive.google.com/uc?id=1hAjqoolhxL--cZXV4ecPahZfIdlmN3is' className='suspenseImage'/>}>
          <AppNavbar />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/login' element={<Login checkLocalToken={checkLocalToken}/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/products' element={<Products />}/>
                <Route path='/products/:productId' element={<ProductView />} />
                <Route path='/profile' element={<Profile />}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Error/>}/> 
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      </UserProvider>
    </>   
  );
}

export default App;
