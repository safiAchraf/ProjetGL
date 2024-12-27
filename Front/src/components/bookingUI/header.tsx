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
      case "Services":
        navigate("/booking");
        break;
      case "Professional":
        if (
          currentStep === "Professional" ||
          currentStep === "Time" ||
          currentStep === "Confirm"
        ) {
          navigate("/booking/professionals");
        }
        break;
      case "Time":
        if (currentStep === "Time" || currentStep === "Confirm") {
          navigate("/booking/time");
        }
        break;
      case "Confirm":
        if (currentStep === "Confirm") {
          navigate("/booking/confirm");
        }
        break;
      default:
        console.log(`No navigation defined for ${crumb}`);
    }
  };

  const isCrumbClickable = (crumb: string) => {
    const currentStep = selectedCrumbs[selectedCrumbs.length - 1];
    const steps = ["Services", "Professional", "Time", "Confirm"];
    return steps.indexOf(crumb) <= steps.indexOf(currentStep);
  };

  return (
    <header className="mb-6">
      <button
        className="mb-2 text-gray-600 hover:text-gray-800 transition-colors"
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
