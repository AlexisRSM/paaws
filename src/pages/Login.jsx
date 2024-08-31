import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //Navigate serves to redirect
//Added by RM
import { useAPI } from '../pages/Context/Context';
import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const { loginUser } = useAPI(); //Hook to acess login func -RM
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }); //Object to practice my non existent skills with objects
  const [error, setError] = useState(null); // For  Man handling login errors :P
  const [loading, setLoading] = useState(false); // For turning off the button while processing
  //States for password reseting
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate(); // Hook for redirection

  //Handle input changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // //Keep the rest of the form data intact
      [name]: value, //update field                          
    })
  }
  // Handle form submission – where dreams come to die
  const handleSubmit = async (e) => {
    e.preventDefault();  // Stop the page from refreshing, because who likes that?
    setLoading(true); //  temporary vacation for button while processing
    setError(null); // Clear the previous disasters

    try {
      const response = await loginUser(formData); // Let's see if the API likes us today
      // Here is the post-login magic- redirect the user somewere nice (update when PAAWS is further in life)
      console.log('Login successful:', response); //test
      navigate('/userprofile'); //Redirects user to profile page
    } catch (err) {
      setError('Something smells funny... Is your pawprint incorrect?'); // Tell user he messed up (politely :D)
    } finally {
      setLoading(false); //Button back from vacation!
    }
  };

  // For the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For password reseting
  const handlePasswordReset = async () => {
    try {                                     //changed to codespaces link
      const response = await axios.post('https://solid-couscous-wr9p957994vh9jp5-3000.app.github.dev/request-password-reset', { email: resetEmail });
      setResetMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResetMessage(error.response.data.message);
      } else {
        setResetMessage('An error occurred. Please try again.');
      }
    }
  };



  return (<>
    <Container fluid>

    <Form onSubmit={handleSubmit} className='my-3'style={{ width: "30%", margin: "auto" }}> {/* Just lowering the form a bit – RM To TT */}
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange} // Change the value – but don’t go breaking my heart
          required // Yeah, you’re gonna need to fill this out – no skipping!
          // Your comments are sending me - BF
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange} // Go ahead, type something secure... hopefully
          required // Seriously, you can’t just skip this – we need to pretend to care about security
          />
      </FloatingLabel>
      <Link onClick={handleShow} className='nonBtnLink forgotPass' >
        <p style={{ marginTop: "1em"}}>Forgot your password?</p>
      </Link>

      {/* If something goes wrong, we’ll kindly let them know – in red, because red means danger */}
      {error && <p className="text-danger">{error}</p>}

      {/* The magic button – either submit or just stare at it while it says 'Logging in...' */}
      <Button className='primaryButton m-2' type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Submit'} {/* Button changes based on how tired it is */}
      </Button>

      <p style={{ marginTop: "1em"}}>Don't have an account? <Link to='/register' className='nonBtnLink'>Register</Link>! {/* No account? Join the fun of filling out more forms! */}</p>
    </Form>
    </Container>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We'll send you an email with a link to reset your password.</p>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </FloatingLabel>
        {resetMessage && <p className="text-info">{resetMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button className='secondaryButton' onClick={handleClose}>
          Close
        </Button>
        <Button className="primaryButton" onClick={() => { handlePasswordReset(); handleClose(); }}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>

  </>
  );
}

export default Login;