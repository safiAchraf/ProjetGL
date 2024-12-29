/* Hooks */
import { useState } from "react";

/* Components */
import LoginModal from "../loginModal";
import SignupModal from "../signupModal";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router";

/* Utils */
import AOS from "aos";

/* Icons */
import { IoIosMenu, IoIosClose } from "react-icons/io";

/* Styles */
import "aos/dist/aos.css";

interface NavigationItem {
  to: string;
  label: string;
  desktopOnly?: boolean;
}

interface NavItemProps extends NavigationItem {
  onClick?: () => void;
  isButton?: boolean;
}

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  AOS.init({
    duration: 700,
    once: true,
  });

  const navigationItems: NavigationItem[] = [
    { to: "Services", label: "Services" },
    { to: "Creations", label: "Creation" },
    { to: "Contacts", label: "Contacts" },
  ];

  const NavItem: React.FC<NavItemProps> = ({
    to,
    label,
    onClick,
    isButton = false,
  }) => {
    const baseClasses =
      "transition ease-in-out duration-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current";

    if (isButton) {
      return (
        <li>
          <button className={baseClasses} onClick={onClick} type="button">
            {label}
          </button>
        </li>
      );
    }

    return (
      <ScrollLink className={baseClasses} spy={true} smooth={true} to={to}>
        <li>{label}</li>
      </ScrollLink>
    );
  };

  const MobileMenu: React.FC = () => (
    <div className="lg:hidden duration-500 block absolute top-24 left-0 right-0 bg-gray-50 transition-opacity text-black z-10">
      <ul className="text-center text-2xl p-20 flex flex-col items-center gap-4">
        {navigationItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        <NavItem
          to=""
          isButton
          label="Login"
          onClick={() => setIsLoginModalOpen(true)}
        />
        <NavItem
          to=""
          isButton
          label="Signup"
          onClick={() => setIsSignupModalOpen(true)}
        />
      </ul>
    </div>
  );

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
    AOS.refresh();
  };

  return (
    <header className="min-h-screen">
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />

      <nav className="px-10 py-10 flex absolute justify-between w-full z-50 text-white lg:py-14 lg:px-20 flex-1 h-10vh">
        <div data-aos="fade-down" className="flex flex-1 items-center">
          <span className="text-4xl">DZ BEAUTY</span>
        </div>

        {/* Desktop Navigation */}
        <div className="lg:flex lg:flex-1 items-center justify-end hidden">
          <ul
            data-aos="fade-down"
            data-aos-delay="100"
            className="flex gap-10 xl:gap-20 xl:mr-16 text-2xl"
          >
            {navigationItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
            <NavItem
              to=""
              isButton
              label="Login"
              onClick={() => setIsLoginModalOpen(true)}
            />
            <NavItem
              to=""
              isButton
              label="Signup"
              onClick={() => setIsSignupModalOpen(true)}
            />
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block text-4xl lg:hidden"
          onClick={toggleMenu}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <IoIosClose /> : <IoIosMenu />}
        </button>

        {menuOpen && <MobileMenu />}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-end">
        <img
          src="/bg.jpg"
          alt="Background Image"
          className="w-full h-full object-cover"
        />

        <div className="px-10 py-10 flex absolute justify-between w-full z-40 text-white lg:py-14 lg:px-20 flex-1 items-center flex-wrap">
          <div>
            <h1
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-6xl text-white mb-4 font-poppins font-extralight"
            >
              DZ Beauty
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="250"
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
  );
};

export default Header;
