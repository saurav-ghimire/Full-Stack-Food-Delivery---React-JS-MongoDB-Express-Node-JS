"use client"
import { useState } from "react";
import Banner from "./components/Banner/Banner";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";
import FoodDisplay from "./components/foodDisplay/foodDisplay";
import AppDownload from "./components/AppDownload/AppDownload";


export default function Home() {
  const[category, setCategory] = useState("All")
  return (
    <div className="wrapper">
        <Banner />        
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  );
}
