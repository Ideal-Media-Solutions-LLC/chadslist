import { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = (props) => {


  return (
    <>
      <br></br>
      <Container>
        <Col>
          <img src="/Chads_List_2.svg" alt="chadslist_logo" width={400}/>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control  placeholder="Your username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Are you a charity or an individual?</Form.Label>
              <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                <option value="0">Individual</option>
                <option value="1">Charity</option>
              </Form.Select>
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

export default SignUp;