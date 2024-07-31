"use client"
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import './Navbar.css'
import { useState } from "react";
import LoginPopup from "../LoginPopup/LoginPopup";
import { storeContext } from "@/app/context/storeContext";
import { useRouter } from "next/navigation";

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const {cartItems, token, setToken} = storeContext();
    const router = useRouter();

    const handlePopup = () => {
        setShowLogin(!showLogin);
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        router.push("/");
    }
  return (     
        <>
            <div className="header-wrapper">
        <div className="navbar">
            <Image src={assets.logo} height={100} width={130} alt="Food Ordering"/>
            <ul className="navbar-menu">
                <li>
                    <Link href="/">Home</Link>
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
                    <Link href="/cart"><Image src={assets.basket_icon} height={20} width={20} alt="Food Ordering"/></Link>
                    {Object.keys(cartItems).length > 0 ? <div className="dot"></div> : ''}
                    
                </div>
                {
                    !token? <button className="custom-button" onClick={() => handlePopup()}>Sign In</button> : <div className="profile-icon">
                        <Image src={assets?.profile_icon} />
                        <ul className="nav-profile-dropdown">
                            <li>
                                <Link href="/myorders"><Image src={assets.bag_icon} /> Order</Link>
                            </li>
                            <li onClick={logout}>
                                <Image src={assets.logout_icon} /> Logout
                            </li>
                        </ul>
                    </div>
                }
                
            </div>
        </div>
        
            {showLogin?<div className="login-wrapper"><LoginPopup setShowLogin={setShowLogin}/></div>:<></>}
        
    </div>
        </>
   );
}

export default Navbar;