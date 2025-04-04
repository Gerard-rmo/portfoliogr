import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [carouselItems] = useState([
    { src: "https://via.placeholder.com/800x400", alt: "Slide 1" },
    { src: "https://via.placeholder.com/800x400", alt: "Slide 2" },
    { src: "https://via.placeholder.com/800x400", alt: "Slide 3" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MonSite</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link></li>
          <li><Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
          <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold">Bienvenue sur MonSite</h2>
        <p className="mt-4 text-lg">Découvrez nos services exceptionnels</p>
        <Button 
          className="mt-6 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
        >
          En savoir plus
        </Button>
      </header>

      {/* Carousel Section */}
      <section className="max-w-4xl mx-auto my-12">
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={true} aria-label="Galerie d'images">
          {carouselItems.map((item, index) => (
            <div key={index}>
              <img src={item.src} alt={item.alt} className="rounded-lg shadow-md" />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}
