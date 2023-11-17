import './App.css';
import AppNavbar from "./components/AppNavbar";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Error from "./pages/Error";
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    console.log(`localStorage clear`)
    localStorage.clear();
  }

  useEffect(() => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}/details`)
  })
  return (
    <>
      <Router>
        <AppNavbar />
        <Container id='landing'>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='*' element={<Error/>}/> 
          </Routes>
        </Container>
      </Router>
    </>   
  );
}

export default App;
