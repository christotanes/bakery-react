import './App.css';
import AppNavbar from "./components/AppNavbar";
import Error from "./pages/Error";
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Register from './pages/Register';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './UserContext';

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
          <AppNavbar />
          <Container fluid id='landing'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login checkLocalToken={checkLocalToken}/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/products' element={<Products />}/>
                <Route path='*' element={<Error/>}/> 
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>   
  );
}

export default App;
