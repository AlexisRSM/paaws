import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom'; //Added useNavigate -RM
//Added by Aléxis
import React, { useState, useContext } from 'react';
import { useAPI } from '../pages/Context/Context';

function Register() {
  const { registerUser } = useAPI(); //Serves as hook to acess register func
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); // For any oopsie moments during registration
  const [success, setSuccess] = useState(null); // For that sweet success message
  const [loading, setLoading] = useState(false); //To make user wait
  const navigate = useNavigate();
  //Basicly updates form dat as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Doesn t allow the form to reload the page
    setLoading(true); //Disable button
    try {
      await registerUser(formData); //Atttemp at registation
      setSuccess('Registration successful!'); //yay!
      alert("Congrats! You've created an account.")
      navigate('/login')
      setError(null); //Clean Errors
    } catch (err) {
      setError('Registration failed. Please try again. 🦧'); //🦧
      setSuccess(null);
    } finally {
      setLoading(false); //Enable button
    }
  };
  return (
    <Form onSubmit={handleSubmit} className='py-3'>
      <FloatingLabel
        controlId="floatingFirstName"
        label="First name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Jane"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingLastName"
        label="Last name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Doe"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingEmailAdress"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Button className='primaryButton m-2' type="submit">
        {loading ? 'Registering...Please Wait' : 'Submit'} {/* while loading showes message (might add something diffent later) */}
      </Button>
      {/* Show success message if registration was successful */}
      {success && <p className="text-success">{success}</p>}
      {/* Show error message if registration failed */}
      {error && <p className="text-danger">{error}</p>}
      <p>Already have an account? <Link to="/login">Log in</Link>!</p>
    </Form>
  );
}

export default Register;