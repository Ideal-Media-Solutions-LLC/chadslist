import { useState, useContext } from 'react';
import { Container, Col, Form, Button, Image } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = (props) => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
    status: '',
    photoUrl: ''
  })

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      alert('Passwords are not matching. Try again')
    }

    registerUser(form)
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value})
  }

  return (
    <>
      <Container className="signup-container">
        <Col>
          <Form className="signup-form" onSubmit={handleSubmit}>
          <Image className="login-logo" src="/Chads_List_2.svg" alt="chadslist_logo" width={300}/>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control placeholder="Upload profile picture" type="file" name="photoUrl" value={form.photoUrl}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={handleChange} required/>
              <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control  placeholder="Your username" name="userName" value={form.userName} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter password" name="password2" value={form.password2} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Are you a charity or an individual?</Form.Label>
              <Form.Select className="me-sm-2" id="inlineFormCustomSelect" name="status" value={form.status} onChange={handleChange} required>
                <option selected="selected" value="individual">Individual</option>
                <option value="charity">Charity</option>
              </Form.Select>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button className="signup-button" variant="primary" type="submit">
                Sign Up
              </Button>
            </Form.Group>
            <Form.Group className="login-signup-redirect">
              <Form.Label>Already have an account?</Form.Label>
              <Button className="login-button" variant="primary" href='/Login'>
                Login
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </>
  )
}

export default SignUp;