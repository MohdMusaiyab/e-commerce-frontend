import React, { useState } from 'react';
import axios from 'axios';
import  toast  from 'react-hot-toast';
import Layout from '../components/layout/Layout';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/contact`,
      formData, // Send formData directly as the request body
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
     
      
    );

    // Assuming the response.status indicates success (e.g., 200)
    if (response.status === 200) {
      console.log('Email sent successfully');
      // You can add further logic here, like showing a success message to the user.
      toast.success('Message Sent');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } else {
      console.error('Failed to send email');
      // Handle the error and provide feedback to the user.
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <Layout>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you! Whether you have a question about our
            products, need assistance with an order, or just want to say hello,
            feel free to reach out to us.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
