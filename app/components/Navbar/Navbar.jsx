"use client";
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginPopup from "../LoginPopup/LoginPopup";
import { useStoreContext } from "@/app/context/storeContext";
import { useRouter } from "next/navigation";
import './Navbar.css';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const { cartItems, token, setToken } = useStoreContext();
  const router = useRouter();

  const handlePopup = () => {
    setShowLogin(!showLogin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="navbar">
          <Link href={'/'}><Image src={assets.logo} height={100} width={130} alt="Food Ordering" /></Link>
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
          <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/mobile-app">Mobile App</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact us</Link>
            </li>
          </ul>
          <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
            <div className="navbar-search-icon">
              <Link href="/cart"><Image src={assets.basket_icon} height={20} width={20} alt="Food Ordering" /></Link>
              {Object.keys(cartItems).length > 0 ? <div className="dot"></div> : ''}
            </div>
            {!token ? (
              <button className="custom-button" onClick={handlePopup}>Sign In</button>
            ) : (
              <div className="profile-icon">
                <Image src={assets?.profile_icon} alt="Profile" />
                <ul className="nav-profile-dropdown">
                  <li>
                    <Link href="/myorders"><Image src={assets.bag_icon} /> Order</Link>
                  </li>
                  <li onClick={logout}>
                    <Image src={assets.logout_icon} alt="Logout" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {showLogin && <div className="login-wrapper"><LoginPopup setShowLogin={setShowLogin} /></div>}
      </div>
    </>
  );
}

export default Navbar;
