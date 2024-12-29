import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router";

/* Components */
import AOS from "aos";

/* Custom Components */
import Carousel from "./components/carousel";
import LoginModal from "./components/loginModal";
import SignupModal from "./components/signupModal";

/* Icons */
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";

/* Styles */
import "aos/dist/aos.css";

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  AOS.init({
    duration: 700,
    once: true,
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    AOS.refresh();
  };

  const content = (
    <>
      <div className="lg:hidden duration-500 block absolute top-32 left-0 right-0 bg-gray-50 transition-opacity text-black z-10">
        <ul className="text-center text-2xl p-20">
          <ScrollLink
            spy={true}
            smooth={true}
            className="my-4 py-4 block transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 "
            to="Services"
          >
            <li>Services</li>
          </ScrollLink>

          <ScrollLink
            spy={true}
            smooth={true}
            className="my-4 py-4 block transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 "
            to="Contacts"
          >
            <li>Contacts</li>
          </ScrollLink>
          <li>
            <button className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current">
              Login
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <main className="font-poppins font-extralight">
      {/* Header (Navigation + Hero) */}
      <header className="min-h-screen ">
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
        />

        {/* Navigation */}
        <nav className="px-10 py-10 flex absolute justify-between w-full z-50 text-white lg:py-14 lg:px-20 flex-1 h-10vh ">
          <div data-aos="fade-down" className="flex flex-1 items-center">
            <span className="text-4xl">DZ BEAUTY</span>
          </div>

          <div className="lg:flex lg:flex-1 items-center justify-end hidden">
            <ul
              data-aos="fade-down"
              data-aos-delay="100"
              className="flex gap-10 xl:gap-20 xl:mr-16 text-2xl "
            >
              <ScrollLink
                className="transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"
                spy={true}
                smooth={true}
                to="Services"
              >
                <li>Services</li>
              </ScrollLink>

              <ScrollLink
                className="transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"
                spy={true}
                smooth={true}
                to="Creations"
              >
                <li>Creation</li>
              </ScrollLink>

              <ScrollLink
                className="transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"
                spy={true}
                smooth={true}
                to="Contacts"
              >
                <li>Contacts</li>
              </ScrollLink>

              <li>
                <button
                  className="transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"
                  onClick={() => {
                    setIsLoginModalOpen(true);
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"
                  onClick={() => {
                    setIsSignupModalOpen(true);
                  }}
                >
                  Signup
                </button>
              </li>
            </ul>
          </div>

          <div>{menuOpen && content}</div>

          <button className="block text-4xl lg:hidden " onClick={toggleMenu}>
            {menuOpen ? <IoIosClose /> : <IoIosMenu />}
          </button>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen flex items-end">
          <img
            src="/bg.jpg"
            alt="Background Image"
            className="w-full h-full object-cover"
          />

          <div className="px-10 py-10 flex absolute justify-between w-full z-40 text-white lg:py-14 lg:px-20 flex-1  items-center flex-wrap">
            <div>
              <h1
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-anchor="#hero-section"
                className="text-6xl text-white mb-4 font-poppins font-extralight"
              >
                DZ Beauty
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="250"
                data-aos-anchor="#hero-section"
                className="text-2xl text-white mb-8"
              >
                Elevating Elegance, Redefining Beauty, and Inspiring Timeless
                Confidence
              </p>
            </div>

            <RouterLink to="/booking" data-aos="fade-up" data-aos-delay="350">
              <span className="flex items-center justify-center border-white border-2 h-20 text-2xl text-white px-10 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                PLAN YOUR VISIT
              </span>
            </RouterLink>
          </div>
        </section>
      </header>

      {/* Services Section */}
      <section className="py-16 mx-auto w-10/12" id="Services">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12  gap-6 lg:gap-0">
          {/* Background lines - visible only on large screens */}
          <div className="hidden lg:block w-px lg:col-start-4 lg:row-start-1 lg:row-end-5 bg-gray-200 "></div>
          <div className="hidden lg:block w-px lg:col-end-9 lg:row-start-2 lg:row-end-6 bg-gray-200 "></div>

          <div
            data-aos="fade-up"
            className="lg:col-end-11 lg:col-span-3 flex flex-col items-start justify-center z-0  lg:mb-10  "
          >
            <h2 className="text-4xl lg:text-5xl mb-2 z-10">Our Services</h2>
            <p className="text-lg lg:text-xl text-gray-600  z-10">
              Beauty Beyond
            </p>
          </div>

          {/* manicure */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="lg:col-start-1 lg:col-end-5 lg:row-start-2 z-10 font-normal "
          >
            <img
              src="/manicure.png"
              alt="Manicure"
              className="object-cover w-full"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Manicure</span>
              <RouterLink
                to="/booking"
                className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
              >
                Show salon →
              </RouterLink>
            </div>
          </div>

          {/* Hair */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="lg:col-end-11 lg:col-span-3 lg:row-start-2  font-normal"
          >
            <img
              src="/hair.png"
              alt="Cocktails"
              className="object-cover w-full"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Hair Care</span>
              <RouterLink
                to="/booking"
                className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
              >
                Show salon →
              </RouterLink>
            </div>
          </div>

          {/* Coffee */}
          <div
            data-aos="fade-up"
            className="lg:col-end-7 lg:col-span-3 lg:row-start-4 font-normal"
          >
            <img
              src="/coffee.png"
              alt="Coffee"
              className="object-cover w-full"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="w-[55%] text-2xl mb-2 sm:mb-0">
                Additional Services
              </span>
              <RouterLink
                to="/booking"
                className="border w-[45%] border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
              >
                Show salon →
              </RouterLink>
            </div>
          </div>

          {/* Pedicure */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="lg:col-end-12 lg:col-span-3 lg:row-start-5 font-normal"
          >
            <img
              src="pedicure.png"
              alt="Pedicure"
              className="object-cover w-full"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Pedicure</span>
              <RouterLink
                to="/booking"
                className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
              >
                Show salon →
              </RouterLink>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="lg:col-start-1 lg:col-end-5 lg:row-start-5 z-10 flex items-center mt-8 lg:mt-0"
          >
            <p className="text-lg lg:text-xl max-w-2xl mx-auto text-left">
              Expert Beauty Services Tailored to Your Unique Style and Needs
            </p>
          </div>
        </div>
      </section>

      {/* Our Creations */}
      <section className="mt-28" id="Creations">
        <div className="w-10/12 flex mx-auto items-center justify-between">
          <div>
            <h2 className="text-4xl lg:text-5xl mb-2 relative z-10 font-light">
              Our Creations
            </h2>
            <p className="text-xl text-gray-600 mb-12 relative z-10">
              Capture Elegance
            </p>
          </div>
          <div>
            <p className="text-xl px-6">
              Custom beauty looks
              <br />
              that highlight your elegance.
            </p>
          </div>
        </div>

        <Carousel
          images={[
            "/carousel1.png",
            "/carousel2.png",
            "/carousel3.png",
            "/carousel4.png",
          ]}
        />
      </section>

      {/* plan you visit */}
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

      {/* Contacts */}
      <footer
        className="w-10/12 border-t border-gray-200 py-20 mx-auto"
        id="Contacts"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-5 gap-4"
          data-aos="zoom-in-up"
        >
          <div className="sm:col-start-2 sm:col-span-1 mb-6 sm:mb-0">
            <h2 className="font-medium text-2xl mb-2">Contacts</h2>
            <p className="mb-1">(69) 054-5870</p>
            <p className="mb-3">dzbeauty@estin.dz</p>
            <div className="flex space-x-3">
              <FaInstagram className="text-2xl cursor-pointer" />
              <RiFacebookBoxLine className="text-2xl cursor-pointer" />
              <TbBrandTiktok className="text-2xl cursor-pointer" />
            </div>
          </div>

          <div className="sm:col-start-4 sm:col-span-1">
            <h2 className="font-medium text-2xl mb-2">Address</h2>
            <p>Springfield, 62704</p>
            <p>123 Maple Street</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
