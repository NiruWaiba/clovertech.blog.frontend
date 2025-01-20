import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-overlay">
        <h1>Contact Us</h1>
        <p>
          Feel free to get in touch with us using the information below. We’re
          excited to hear from you!
        </p>

        <div className="contact-info">
          <h2>Our Contact Details</h2>
          <p><strong>Phone:</strong> +977-9801234567</p>
          <p><strong>Email:</strong> info@clovertechblog.com</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="http://clovertechnepal.com.np/" target="_self" rel="noopener noreferrer">
              Clover Tech Nepal
            </a>
          </p>
        </div>
        <div className="social-media">
          <h2>Follow Us</h2>
          <a href="https://www.facebook.com/clovertechnepal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="https://www.twitter.com/clovertechnepal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://www.instagram.com/clovertechnepal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="https://www.linkedin.com/company/clovertechnepal" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
