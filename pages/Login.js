import React, { useState, useContext } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(form);
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value});
  };
  return (
    <>
      <br></br>
      <Container className="form-container">
        <Col>
          <Form className="login-form" onSubmit={handleSubmit}>
            <img className="login-logo" src="/Chads_List_2.svg" alt="chadslist_logo"/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button id="login-button-login-form" variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
            <Form.Group className="login-signup-redirect">
              <Form.Label>Don`&apos;`t have an account?</Form.Label>
              <Button id="signup-button-redirect" variant="primary" href='/SignUp'>
                Signup
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default Login;