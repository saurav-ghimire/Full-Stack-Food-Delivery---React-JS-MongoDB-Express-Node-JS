import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";
import Link from "next/link";
import { MyProvider } from "./context/storeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Delivery",
  description: "Best Food Delivery",
};

export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/fav.png" />
        </head>
      <body className={inter.className}>
      <MyProvider>     
        <Navbar /> 
          <div className="wrapper">
            
              {children}
            
          </div>
          <Footer />
        </MyProvider>
      </body>
    </html>
  );
}
