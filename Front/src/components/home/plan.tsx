import { Link as RouterLink } from "react-router";

const PlanVisit = () => {
  return (
    <section className="mx-auto flex w-full md:w-3/5 lg:w-2/5 flex-col items-center mt-24 mb-16 lg:mt-56 lg:mb-28 relative px-4">
      <div className="absolute z-10 top-[-60px] lg:top-[-90px] text-center">
        <p className="text-lg md:text-xl">
          Exquisite Elegance, Timeless Radiance
        </p>
        <h2 className="text-6xl lg:text-7xl xl:text-8xl">DZ Beauty</h2>
      </div>
      <img
        src="/nails.png"
        data-aos="zoom-in-up"
        alt="Pedicure"
        className="object-cover w-3/4 md:w-2/3 lg:w-1/2"
      />
      <div className="py-6 md:py-10 flex-col flex justify-center items-center">
        <p className="text-lg md:text-xl text-center">
          Indulge in Luxury <br />
          Book Your Escape to Radiant Beauty Today!
        </p>
        <RouterLink
          to="/booking"
          className="font-light mt-4 text-lg md:text-2xl border border-black px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        >
          PLAN YOUR VISIT
        </RouterLink>
      </div>
    </section>
  );
};

export default PlanVisit;
