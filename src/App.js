import './App.css';
import AppNavbar from "./components/AppNavbar";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <AppNavbar />
      <Container>
        <Home />
        <Courses />
        <Register />
        <Login />
      </Container>
    </>   
  );
}

export default App;
