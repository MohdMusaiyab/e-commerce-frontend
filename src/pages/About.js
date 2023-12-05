import React from "react";
import Layout from "../components/layout/Layout";
import shopImage from "../assets/shop.jpg";

const About = () => {
  return (
    <Layout title="About Us">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h1>Welcome to E-commerce App</h1>
            <p>
              Welcome to our E-commerce App! We are passionate about providing
              you with high-quality products and a seamless shopping experience.
              Our team is dedicated to bringing you the latest trends and
              ensuring your satisfaction with every purchase.
            </p>
            <p>
              At E-commerce App, we believe in the power of convenience and
              style. Explore our curated collection of products, handpicked just
              for you. Whether you're looking for fashion, electronics, or home
              essentials, we've got you covered. Join us on this exciting
              journey of online shopping and discover a world of possibilities.
            </p>
            
          </div>
          <div className='col-md-4 d-flex justify-content-center align-items-center'>
            <img src={shopImage} alt="Shopping Image" height={'200px'} width={'250px'} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
