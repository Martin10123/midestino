import { useState, useEffect } from "react";
import {
  cenaRomantica,
  escapadaPlaya,
  exploracionUrbana,
  fondo1,
  fondo2,
  retiroBienestar,
} from "../images";

const images = [
  {
    src: fondo1,
    title: "Encuentra planes únicos",
    description: "Explora experiencias para hacer solo, en familia y más.",
  },
  {
    src: fondo2,
    title: "Agrupa tus planes",
    description:
      "Agrega varios planes en un carrito y dales un nombre general.",
  },
  {
    src: escapadaPlaya,
    title: "Escapada a la playa",
    description: "Relájate con nuestros planes de escapadas.",
  },
  {
    src: exploracionUrbana,
    title: "Exploración Urbana",
    description: "Descubre la ciudad con experiencias guiadas.",
  },
  {
    src: retiroBienestar,
    title: "Retiro de Bienestar",
    description: "Encuentra tu paz en retiros de bienestar.",
  },
  {
    src: cenaRomantica,
    title: "Cena Romántica",
    description: "Sorprende a tu pareja con una cena romántica.",
  },
];

export const CaruselDeInformacion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="relative h-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              className="block w-full h-full object-cover"
              alt={image.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-7xl font-bold">{image.title}</h2>
              <p className="text-2xl mt-2">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};
