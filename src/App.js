import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Login from "./pages/Login";
import Customer from "./pages/Customer"
import Book from "./pages/Book";
import Sale from "./pages/Sale"
import Feedback from "./pages/Feedback";
import axios from 'axios';

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] =  useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/signin', { email, password });
      console.log("response");
      const { token } = response.data;
      // Store the token in local storage for subsequent requests
      localStorage.setItem('token', token);
      // Decode the token to get user information (for this example, we'll use the username)
    //   const decodedToken = jwt.decode(token);
    //   const user = decodedToken.username;
      let user = response.data.customer.email;
      setEmail(user);
      setLoggedIn(true);
      window.location.href = '/books';


    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    // Check if the user is already authenticated based on the presence of a token in localStorage
    const token = localStorage.getItem('token');
    console.log("token",token);

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {
        loggedIn ? 
        <BrowserRouter>
          <Routes>
              <Route path="customers" element={<Customer />} />
              <Route path="books" element={<Book />} />
              <Route path="sales" element={<Sale />} />
              <Route path="feedbacks" element={<Feedback />} />
              <Route path="/" element={<Book />}>
            </Route>
          </Routes>
      </BrowserRouter> : (
        <Row className="mt-3">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2>Login</h2>
          <Form>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input type="text" id="email" value={email} onChange={handleEmailChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
            </FormGroup>
            <Button color="primary" onClick={handleLogin}>Login</Button>
          </Form>
        </Col>
      </Row>
      )
      }
        
    </div>
    
  
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

