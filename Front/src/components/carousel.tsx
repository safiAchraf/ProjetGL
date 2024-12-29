import Slider, { CustomArrowProps } from "react-slick";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow Component
const CustomNextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <div
      className="hidden md:block absolute top-1/2 right-[-60px] transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <IoArrowForwardCircleOutline
        size={36}
        className="text-zinc-700 transition-transform duration-250 ease-in-out transform hover:translate-x-1"
      />
    </div>
  );
};

// Custom Previous Arrow Component
const CustomPrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <div
      className="hidden md:block absolute top-1/2 left-[-60px] transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <IoArrowBackCircleOutline
        size={36}
        className="text-zinc-700 transition-transform duration-250 ease-in-out transform hover:-translate-x-1"
      />
    </div>
  );
};

interface CarouselProps {
  images: string[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
}

const Carousel = ({
  images,
  slidesToShow = 4,
  autoplay = true,
  autoplaySpeed = 1500,
  speed = 500,
}: CarouselProps) => {
  const settings = {
    autoplay,
    autoplaySpeed,
    infinite: images.length > 1,
    speed,
    slidesToShow: images.length === 1 ? 1 : slidesToShow,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: images.length === 1 ? 1 : 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length === 1 ? 1 : 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-10/12 mx-auto relative mt-16 mb-6">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            data-aos="zoom-in-up"
            data-aos-delay={`${index * 100}`}
          >
            <img
              src={image}
              className="w-full h-[28rem] object-center px-2"
              alt={`Salon Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
