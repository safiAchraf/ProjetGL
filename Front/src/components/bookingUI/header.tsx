import React from "react";
import { useNavigate } from "react-router";

/* Icons */
import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  breadcrumbs: string[];
  selectedCrumbs: string[];
}

const Header = ({ title, breadcrumbs, selectedCrumbs = [] }: Props) => {
  const navigate = useNavigate();

  const handleNavigation = (crumb: string) => {
    const currentStep = selectedCrumbs[selectedCrumbs.length - 1];

    switch (crumb) {
      case "Salons":
        navigate("/booking/");
        break;
      case "Services":
        if (
          currentStep === "Services" ||
          currentStep === "Reservation" ||
          currentStep === "Confirm"
        ) {
          navigate("/booking/services/");
        }
        break;
      case "Reservation":
        if (currentStep === "Reservation" || currentStep === "Confirm") {
          navigate("/booking/reservation/");
        }
        break;
      case "Confirm":
        if (currentStep === "Confirm") {
          navigate("/booking/confirm/");
        }
        break;
      default:
        console.log(`No navigation defined for ${crumb}`);
    }
  };

  const isCrumbClickable = (crumb: string) => {
    const currentStep = selectedCrumbs[selectedCrumbs.length - 1];
    const steps = ["Salons", "Services", "Reservation", "Confirm"];
    return steps.indexOf(crumb) <= steps.indexOf(currentStep);
  };

  return (
    <header className="mb-6">
      <button
        className="mb-4 text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out transform hover:-translate-x-1"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={24} />
      </button>

      {breadcrumbs && (
        <nav className="text-sm text-gray-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-1">&gt;</span>}
              <span
                className={`
                                    ${
                                      isCrumbClickable(crumb)
                                        ? "hover:text-gray-700 cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                    }
                                    ${
                                      selectedCrumbs.includes(crumb)
                                        ? "font-bold text-gray-900"
                                        : ""
                                    }
                                `}
                onClick={() =>
                  isCrumbClickable(crumb) && handleNavigation(crumb)
                }
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="text-4xl font-medium">{title}</h1>
    </header>
  );
};

export default Header;
