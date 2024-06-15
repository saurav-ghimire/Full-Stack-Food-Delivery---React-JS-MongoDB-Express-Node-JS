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
      </div>
    </div>
  );
}

export default AppDownload;
