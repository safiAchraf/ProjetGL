import Slider, { CustomArrowProps } from "react-slick";

/* Icons */
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

/* Images */
import Carousel1 from "../assets/carousel1.png";
import Carousel2 from "../assets/carousel2.png";
import Carousel3 from "../assets/carousel3.png";
import Carousel4 from "../assets/carousel4.png";

/* Styles */
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
        className="text-zinc-700 transition-transform duration-250 ease-in-out transform hover:translate-x-1.5"
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
        className="text-zinc-700 transition-transform duration-250 ease-in-out transform hover:-translate-x-1.5"
      />
    </div>
  );
};

const Carousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div className="w-10/12 mx-auto relative mt-16">
      <Slider {...settings}>
        <div data-aos="zoom-in-up" data-aos-delay="100">
          <img src={Carousel4} className="w-full h-[28rem] object-cover px-2" />
        </div>
        <div data-aos="zoom-in-up" data-aos-delay="50">
          <img src={Carousel2} className="w-full h-[28rem] object-cover px-2" />
        </div>
        <div data-aos="zoom-in-up" data-aos-delay="150">
          <img src={Carousel3} className="w-full h-[28rem] object-cover px-2" />
        </div>
        <div data-aos="zoom-in-up">
          <img src={Carousel1} className="w-full h-[28rem] object-cover px-2" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
