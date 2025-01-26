/* Hooks */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import useBooking from "../../hooks/useBooking";
import useAuth from "../../hooks/useAuth";

/* Components */
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import ReviewStars from "../review/ReviewStars";
import { Button } from "../ui/button";
import SignupModal from "../signupModal";
import LoginModal from "../loginModal";

/* Utils */
import { format } from "date-fns";

/* Assets */
import { Loader2, MapPin } from "lucide-react";

interface Props {
  selectedDate?: Date;
  selectedTime?: string;
  currentPage: string;
  isSubmitting?: boolean;
  onContinue: () => void;
}

const SidePanel = ({
  selectedDate,
  selectedTime,
  currentPage,
  isSubmitting,
  onContinue,
}: Props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const {
    selectedSalon,
    selectedServices,
    inHouseServices,
    setInHouseServices,
  } = useBooking();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { price, setPrice, points, setPoints } = useBooking();

  const totalDuration = selectedServices.reduce((sum, service) => {
    return sum + service.duration;
  }, 0);

  const handleInHouseToggle = (serviceId: string) => {
    setInHouseServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const isButtonDisabled = () => {
    if (currentPage === "selectSalon") return selectedSalon.id === "";
    if (currentPage === "selectServices") return selectedServices.length === 0;
    if (currentPage === "selectTime") return !selectedDate || !selectedTime;
    return false;
  };

  useEffect(() => {
    if (selectedSalon.id === "") {
      navigate("/booking");
    }

    if (selectedServices.length === 0) {
      navigate("/booking/services");
    }
  }, [navigate, selectedSalon.id, selectedServices.length]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      setPrice(
        selectedServices.reduce((sum, service) => {
          const inHouseCharge = inHouseServices[service.id!] ? 10 : 0;
          return sum + service.price + inHouseCharge;
        }, 0)
      );
    };

    const calculatePoints = () => {
      setPoints(
        selectedServices.reduce((sum, service) => {
          const inHousePoints = inHouseServices[service.id!] ? 100 : 0;
          return sum + service.pointPrice + inHousePoints;
        }, 0)
      );
    };

    calculateTotalPrice();
    calculatePoints();
  }, [inHouseServices, selectedServices, setPoints, setPrice]);

  return (
    <div className="bg-white shadow-md md:rounded-lg overflow-hidden">
      <div className="p-4 hidden md:block">
        <div className="flex items-center mb-4">
          {selectedSalon.pictures[0] ? (
            <img
              src={selectedSalon.pictures[0].url}
              className="w-[5.35rem] max-h-16 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="rounded-full object-cover mr-3 bg-zinc-100 p-8"></div>
          )}

          <div className="w-full flex flex-col items-start">
            <div className="w-full flex items-center justify-between">
              <h3 className="font-semibold">{selectedSalon.name}</h3>

              <ReviewStars rating={selectedSalon.rating || 0} />
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">
                {selectedSalon.address} - {selectedSalon.city}
              </span>
            </div>
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Time</h4>
            <p className="text-sm">{format(selectedDate, "EEEE d MMMM")}</p>
            <p className="text-sm">{selectedTime}</p>
          </div>
        )}

        {selectedServices.length > 0 && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Selected Services</h4>
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="mb-2 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.duration} mins • ${service.price} • $
                    {service.pointPrice} pts
                    {inHouseServices[service.id!] && " + $100 (at home)"}
                  </p>
                </div>

                {service.inHouse && (
                  <div className="flex items-center gap-1">
                    <Label
                      htmlFor={`atHome-${service.id}`}
                      className="text-xs cursor-pointer"
                    >
                      At Home
                    </Label>
                    <Checkbox
                      id={`atHome-${service.id}`}
                      checked={inHouseServices[service.id!] || false}
                      onCheckedChange={() => handleInHouseToggle(service.id!)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>

          <p className="flex gap-2">
            <span className="font-semibold text-xl">${price.toFixed()}</span>|
            <span className="font-semibold text-xl">
              {points.toFixed()} pts
            </span>
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {selectedServices.length} service
          {selectedServices.length !== 1 ? "s" : ""} • {totalDuration} mins
        </p>

        {isAuthenticated ? (
          <Button
            className="w-full"
            onClick={onContinue}
            disabled={isButtonDisabled() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        ) : (
          <>
            {pathname.includes("confirmation") ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Signup
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={onContinue}
                disabled={isButtonDisabled()}
              >
                Continue
              </Button>
            )}
          </>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
};

export default SidePanel;
