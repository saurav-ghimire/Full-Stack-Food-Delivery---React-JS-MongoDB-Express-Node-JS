import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { MyProvider } from "./context/storeContext";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Delivery",
  description: "Best Food Delivery",
};

export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <MyProvider>     
        <Navbar /> 
          <div className="body-wrapper">
            {children}
          </div>
          <Footer />
        </MyProvider>
      </body>
    </html>
  );
}
