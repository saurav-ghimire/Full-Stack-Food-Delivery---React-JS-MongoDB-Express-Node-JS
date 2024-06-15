"use client"
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import './Navbar.css'
import { useState } from "react";
import LoginPopup from "../LoginPopup/LoginPopup";
function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const handlePopup = () => {
        setShowLogin(!showLogin)
        console.log(showLogin)
    }
  return ( 
    
    <div className="header-wrapper">
        <div className="navbar">
            <Image src={assets.logo} height={100} width={130} alt="Food Ordering"/>
            <ul className="navbar-menu">
                <li>
                    <Link href="">Home</Link>
                </li>
                <li>
                    <Link href="">Menu</Link>
                </li>
                <li>
                    <Link href="">Mobile App</Link>
                </li>
                <li>
                    <Link href="">Contact us</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <Image src={assets.search_icon} height={20} width={20} alt="Food Ordering"/>
                <div className="navbar-search-icon">
                    <Image src={assets.basket_icon} height={20} width={20} alt="Food Ordering"/>
                    <div className="dot"></div>
                </div>
                <button className="custom-button" onClick={() => handlePopup()}>Sign In</button>
            </div>
        </div>
        
            {showLogin?<div className="login-wrapper"><LoginPopup setShowLogin={setShowLogin}/></div>:<></>}
        
    </div>
   );
}

export default Navbar;