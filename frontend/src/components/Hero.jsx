import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Hero = () => (
  <section className="hero">
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000}>
      <div className="relative">
        <img
          src="/images/tech2.avif"
          alt="Tech Conference"
          className="w-full h-[500px] object-cover"
        />
        <p className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white text-2xl font-semibold px-6 py-3 rounded-lg max-w-md">
          Host Cutting-Edge Tech Conferences with Ease
        </p>
      </div>
      <div className="relative">
        <img
          src="/images/tech1.jpg"
          alt="Tech Workshop"
          className="w-full h-[500px] object-cover"
        />
        <p className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white text-2xl font-semibold px-6 py-3 rounded-lg max-w-md">
          Organize Interactive Workshops & Networking Events
        </p>
      </div>
      <div className="relative">
        <img
          src="/images/tech1.jpg"
          alt="Tech Expo"
          className="w-full h-[500px] object-cover"
        />
        <p className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white text-2xl font-semibold px-6 py-3 rounded-lg max-w-md">
          Simplify Your Tech Expo Planning & Vendor Management
        </p>
      </div>
    </Carousel>
  </section>
);

export default Hero;
