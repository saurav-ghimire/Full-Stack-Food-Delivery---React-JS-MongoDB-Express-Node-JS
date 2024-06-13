import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import './Navbar.css'

function Navbar() {
  return ( 
    <div className="navbar">
      <Image src={assets.logo} height={100} width={130} />
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
          <Image src={assets.search_icon} height={20} width={20} />
          <div className="navbar-search-icon">
            <Image src={assets.basket_icon} height={20} width={20} />
              <div className="dot"></div>
          </div>
          <button>Sign In</button>
      </div>
    </div>
   );
}

export default Navbar;