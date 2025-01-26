import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

interface CarouselProps {
  images: string[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const BookingCarousel = ({
  images,
  slidesToShow = 4,
  autoplay = true,
  autoplaySpeed = 1500,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: slidesToShow,
    },
    autoplay ? [Autoplay({ delay: autoplaySpeed })] : []
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onScroll]); // Fixed effect cleanup

  return (
    <div className="w-10/12 mx-auto relative mt-16 mb-6 group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative flex-[0_0_calc(100%/${slidesToShow})] min-w-0"
              style={{
                flex: `0 0 calc(100% / ${slidesToShow})`,
                transition: "transform 0.5s ease-out",
                transform: `scale(${index === selectedIndex ? 1.05 : 1})`,
              }}
            >
              <img
                src={url}
                loading="lazy"
                className="w-full h-auto object-contain px-2"
                alt={`Salon Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden md:flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-[calc(100%+120px)] left-[-60px]">
        <button
          onClick={scrollPrev}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <IoArrowBackCircleOutline
            size={36}
            className="text-zinc-700 hover:-translate-x-1 transition-transform"
          />
        </button>

        <button
          onClick={scrollNext}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <IoArrowForwardCircleOutline
            size={36}
            className="text-zinc-700 hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 mt-4">
        <div
          className="h-full bg-zinc-700 transition-[width] duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default BookingCarousel;
