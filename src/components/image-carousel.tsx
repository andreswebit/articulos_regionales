import React from "react";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";


interface CarouselImage {
  src: string; // Ej: "/assets/img/jujuy/pexels-aldys-cattania.jpg"
  alt: string;
  title?: string;
  description?: string;
  link?: string; // Opcional para el botón "Ver más"
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    if (autoPlay) {
      timerRef.current = window.setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval]);

  return (
    <div
      className="flex justify-center items-center w-full py-12 px-4 bg-fixed bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/public/assets/backgrounds/hornocalbn.jpg')",
        backgroundColor: "#e5e7eb", // Gris claro
      }}
    >
      <Card className="w-full max-w-4xl overflow-hidden relative shadow-xl rounded-2xl">
        <CardBody className="p-0 overflow-hidden">
          <div className="relative aspect-[16/9]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  removeWrapper
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  src={image.src}
                />
                {(image.title || image.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    {image.title && <h3 className="text-2xl font-bold">{image.title}</h3>}
                    {image.description && (
                      <p className="text-sm mt-1 mb-2">{image.description}</p>
                    )}
                    {image.link && (
                      <a
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 bg-white text-black px-3 py-1 rounded hover:bg-gray-200 text-sm"
                      >
                        Ver más
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          <Button
            isIconOnly
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            size="sm"
            variant="flat"
            onPress={prevSlide}
          >
            <Icon icon="lucide:chevron-left" width={20} />
          </Button>

          <Button
            isIconOnly
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            size="sm"
            variant="flat"
            onPress={nextSlide}
          >
            <Icon icon="lucide:chevron-right" width={20} />
          </Button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
