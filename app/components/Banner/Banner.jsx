import Link from 'next/link';
import './Banner.css';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h2>Order your Favourite Food Here</h2>
        <p>From savory mains to mouth-watering desserts, we have something for every taste and preference. Place your order now and enjoy a delightful meal delivered straight to your door!</p>
        <Link href={'/menu'}><button className="custom-button">View Menu</button></Link>
      </div>
    </div>
  );
}

export default Banner;
