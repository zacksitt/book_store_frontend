import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] =  useState(false);

  console.log("login",loggedIn);

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


    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container>
      {loggedIn ? (
        <p className="mt-3">Welcome, {email}!</p>
      ) : (
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
              <a color="primary" className='btn btn-primary' onClick={handleLogin} href='/books'>Login</a>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LoginForm;