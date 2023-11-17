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

function App() {

  return (
    <>
      {/* <UserProvider value={{ user, setUser, unsetUser }}> */}
        <Router>
          <AppNavbar />
          <Container fluid id='landing'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/products' element={<Products />}/>
                <Route path='*' element={<Error/>}/> 
            </Routes>
          </Container>
        </Router>
      {/* </UserProvider> */}
    </>   
  );
}

export default App;
