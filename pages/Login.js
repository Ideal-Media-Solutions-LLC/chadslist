import { useState, useContext } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext'

const Login = (props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      alert('Passwords are not matching. Try again')
    }

    loginUser(form)
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value})
  }
  return (
    <>
      <br></br>
      <Container>
        <Col>
          <img src="/Chads_List_2.svg" alt="chadslist_logo" width={400}/>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={handleChange} required/>
              <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password2" value={form.password2} onChange={handleChange} required/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </>
  )
}

export default Login;