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
    accType: 'Individual',
    photoUrl: '/profile_placeholder_2.svg'
  })

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      alert('Passwords are not matching. Try again')
    } else {
      registerUser(form)
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value})
  }

  const handleFileChange = (e) => {
    setForm({...form, photoUrl: URL.createObjectURL(e.target.files[0])});
  }

  return (
    <>
      <Container className="form-container">
        <Col>
          <Form className="signup-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Image className="login-logo" src="/Chads_List_2.svg" alt="chadslist_logo" width={425}/>
              <Image className="default-profile-pic" src={form.photoUrl} width={300} roundedCircle/>
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control placeholder="Upload profile picture" type="file" name="photoUrl" onChange={handleFileChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control  placeholder="Your username" name="userName" value={form.userName} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Re-enter password" name="password2" value={form.password2} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="accountType">Are you a charity or an individual?</Form.Label>
              <Form.Select className="me-sm-2" id="inlineFormCustomSelect" name="accountType" value={form.accType} onChange={handleChange} required>
                <option value="individual">Individual</option>
                <option value="charity">Charity</option>
              </Form.Select>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button id="signup-button-signup-form" variant="primary" type="submit">
                Sign Up
              </Button>
            </Form.Group>
            <Form.Group className="login-signup-redirect">
              <Form.Label>Already have an account?</Form.Label>
              <Button id="login-button-redirect" variant="primary" href='/Login'>
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