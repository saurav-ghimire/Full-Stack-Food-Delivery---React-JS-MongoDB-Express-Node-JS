'use client'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './ContactUs.css';
import { toast } from 'react-toastify';

function ContactUs() {
  const handleForm = (event) => {
    event.preventDefault();
    toast.error('Message Feature is not Enabled');
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us. We&lsquo;re here to help!</p>
        <div className="contact-content">
          <div className="contact-info">
            <ul>
              <li><FaEnvelope /> sauravghimire0123@gmail.com</li>
              <li><FaPhone /> +1 437 665 1828</li>
              <li><FaMapMarkerAlt /> 180 Canterbury Court, Sarnia, Ontario</li>
            </ul>
          </div>
          <form className="contact-form" onSubmit={handleForm}>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
