"use client"
import { useState } from "react";
import Banner from "./components/Banner/Banner";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";
import FoodDisplay from "./components/foodDisplay/foodDisplay";
import AppDownload from "./components/AppDownload/AppDownload";


export default function Home() {
  const[category, setCategory] = useState("All")
  return (
    <div className="body-wrapper">
      <div>
      <div className="svg-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlnsSvgjs="http://svgjs.dev/svgjs"
          width="1440"
          height="560"
          preserveAspectRatio="none"
          viewBox="0 0 1440 560"
        >
          <g mask="url(#SvgjsMask1337)" fill="none">
            <rect
              width="100%"
              height="560"
              x="0"
              y="0"
              fill="rgba(255, 99, 71, 1)"
            ></rect>
            <path
              d="M0,366.973C75.681,368.662,156.724,383.846,221.355,344.435C286.401,304.77,304.832,222.432,344.099,157.145C389.168,82.21,460.844,19.613,469.075,-67.443C478.118,-163.083,451.524,-264.199,390.99,-338.795C329.718,-414.301,235.809,-463.161,139.174,-473.983C48.867,-484.097,-32.366,-430.761,-116.156,-395.591C-190.52,-364.377,-263.575,-334.387,-323.083,-279.953C-388.383,-220.222,-472.059,-156.64,-474.105,-68.166C-476.162,20.797,-381.196,77.257,-333.072,152.109C-293.075,214.321,-277.246,294.603,-215.096,334.696C-152.912,374.811,-73.982,365.322,0,366.973"
              fill="#d42000"
            ></path>
            <path
              d="M1440 993.979C1537.752 999.4490000000001 1635.5149999999999 1040.935 1727.459 1007.2950000000001 1828.621 970.2819999999999 1925.7060000000001 900.1859999999999 1967.594 800.944 2009.204 702.36 1980.788 588.64 1947.021 487.101 1917.13 397.216 1854.511 325.822 1787.371 259.001 1724.483 196.411 1652.411 148.88099999999997 1571.226 113.08600000000001 1479.677 72.72199999999998 1385.526 21.966999999999985 1286.817 38.30600000000004 1183.847 55.351 1085.311 115.77300000000002 1028.0059999999999 203.005 972.95 286.813 995.617 394.96000000000004 986.8969999999999 494.854 978.73 588.421 944.6569999999999 683.15 978.4449999999999 770.785 1013.0350000000001 860.499 1085.937 934.3820000000001 1172.498 976.241 1254.6109999999999 1015.948 1348.932 988.883 1440 993.979"
              fill="#ffc4b9"
            ></path>
          </g>
          <defs>
            <mask id="SvgjsMask1337">
              <rect width="1440" height="560" fill="#ffffff"></rect>
            </mask>
          </defs>
        </svg>
      </div>
          </div>
        <Banner />        
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  );
}
