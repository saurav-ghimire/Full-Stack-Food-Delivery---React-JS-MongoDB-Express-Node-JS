"use client";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import './LoginPopup.css';

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Login");

  const handleClick = (data) => {
    setCurrentState(data);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <IoClose onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currentState === 'Sign Up' && <input type="text" placeholder="Your Name" required />}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currentState === 'Sign Up' ? 'Create Your Account Now' : 'Login'}</button>
        <div className="login-pop-up-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === 'Login' ? (
          <p>Create a New Account? <span onClick={() => handleClick('Sign Up')}>Click Here</span></p>
        ) : (
          <p>Already Have an Account? <span onClick={() => handleClick('Login')}>Login Here</span></p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
