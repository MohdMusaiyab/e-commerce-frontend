import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer mt-5 py-4 bg-dark text-light">
      <div className="container">
        <h1 className="text-center mb-4">All Rights Reserved &copy; Musaiyab</h1>
        <div className="text-center">
          <p className="mb-2">
            <Link to="/about" className="text-light">
              About
            </Link>
            {" | "}
            <Link to="/policy" className="text-light">
              Privacy Policy
            </Link>
            {" | "}
            <Link to="/contact" className="text-light">
              Contact Us
            </Link>
          </p>
          {/* Add your social media icons or links here */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
