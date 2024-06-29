"use client";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from 'react';
import './LoginPopup.css';
import axios from "axios";
import { storeContext } from "@/app/context/storeContext";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken } = storeContext();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({
      ...data, [name]:value
    }))
  }

  
  const handleClick = (data) => {
    setCurrentState(data);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newURL = url;
    if(currentState === 'Login'){
      newURL += "api/user/login";
    }else{
      newURL += "api/user/register";  
    }
    
    const response = await axios.post(newURL, data)
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message)
      console.log(response.data)
    }
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <IoClose onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currentState === 'Sign Up' && <input type="text" name="name" placeholder="Your Name" required
          onChange={onChangeHandler}
          value={data.name}
           />}
          <input type="email" placeholder="Your Email" name="email" required
          onChange={onChangeHandler}
          value={data.email}
           />
          <input type="password" placeholder="Password" name="password" required
          onChange={onChangeHandler}
          value={data.password}
           />
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
