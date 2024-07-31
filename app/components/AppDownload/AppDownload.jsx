import { assets } from '@/app/assets/assets';
import Image from 'next/image';
import './AppDownload.css';

function AppDownload() {
  return (
    <div className="app-download">
      <div className="app-download-content">
        <h2 className="app-download-title">For a Better Experience, Download Our App</h2>
        <p className="app-download-description">
          Get the best experience by using our mobile app. Download it now from the App Store or Google Play!
        </p>
        <div className="app-download-buttons">
          <a href="#" className="app-download-link">
            <Image src={assets.app_store} alt="App Store" className="app-download-image" />
          </a>
          <a href="#" className="app-download-link">
            <Image src={assets.play_store} alt="Play Store" className="app-download-image" />
          </a>
        </div>
        <div className="svg-cloud">
      <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlnsSvgjs="http://svgjs.dev/svgjs"
    width="100%"
    height="300"
    preserveAspectRatio="none"
    viewBox="0 0 1440 560"
  >
    <g mask="url(#SvgjsMask1000)" fill="none">
     
      <path
        d="M1488 560L0 560 L0 361.36Q78.22 319.58, 120 397.79Q172.51 330.3, 240 382.81Q324.67 347.48, 360 432.14Q403.47 403.61, 432 447.07Q468.32 363.39, 552 399.71Q594.94 370.65, 624 413.59Q663.27 332.86, 744 372.13Q792.48 348.61, 816 397.08Q870.09 379.17, 888 433.26Q914.02 387.28, 960 413.31Q967.68 348.99, 1032 356.67Q1102.07 354.74, 1104 424.81Q1147.54 348.35, 1224 391.88Q1246.04 341.92, 1296 363.96Q1339.36 335.31, 1368 378.67Q1440 330.68, 1488 402.68z"
        fill="#25467d"
      ></path>
      <path
        d="M1560 560L0 560 L0 467.4Q52.87 400.26, 120 453.13Q148.62 409.75, 192 438.37Q241.27 415.64, 264 464.92Q322.49 451.41, 336 509.9Q365.86 419.75, 456 449.61Q479.03 400.64, 528 423.67Q609.25 432.92, 600 514.18Q604.41 446.58, 672 450.99Q713.29 420.28, 744 461.58Q763.11 408.69, 816 427.8Q858.88 398.68, 888 441.56Q985.89 419.45, 1008 517.34Q1036.17 425.51, 1128 453.69Q1209.96 415.65, 1248 497.61Q1316.91 446.53, 1368 515.44Q1387.47 462.92, 1440 482.39Q1474.6 396.99, 1560 431.59z"
        fill="#356cb1"
      ></path>
      <path
        d="M1560 560L0 560 L0 566.45Q31.82 526.27, 72 558.09Q105.57 471.66, 192 505.24Q243.9 485.14, 264 537.05Q276.64 477.69, 336 490.33Q378.09 460.42, 408 502.52Q474.09 448.61, 528 514.69Q596.64 511.34, 600 579.98Q626.37 534.35, 672 560.71Q684.17 500.88, 744 513.06Q810.54 459.6, 864 526.13Q906.27 496.4, 936 538.68Q1019.69 502.37, 1056 586.05Q1103.21 513.26, 1176 560.47Q1221.47 485.94, 1296 531.42Q1317.34 480.75, 1368 502.09Q1412.31 474.4, 1440 518.71Q1527.78 486.49, 1560 574.26z"
        fill="white"
      ></path>
    </g>
    <defs>
      <mask id="SvgjsMask1000">
        <rect width="1440" height="560" fill="#ffffff"></rect>
      </mask>
    </defs>
  </svg>
      </div>
      </div>
      
    </div>
  );
}

export default AppDownload;
