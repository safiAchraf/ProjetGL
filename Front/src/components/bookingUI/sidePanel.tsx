/* Hooks */
import { useState } from "react";
import { useBooking } from "../../hooks/useBooking";

/* Components */
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import ReviewStars from "../review/reviewStars";
import ReviewsList from "../review/reviewsList";

/* Utils */
import { format } from "date-fns";
import type { Salon, Service } from "../../hooks/BookingContext";

interface Props {
  selectedSalon: Salon;
  selectedServices: Service[];
  selectedDate?: Date;
  selectedTime?: string;
  currentPage: string;
  onContinue: () => void;
}

const SidePanel = ({
  selectedSalon,
  selectedServices,
  selectedDate,
  selectedTime,
  currentPage,
  onContinue,
}: Props) => {
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const { setSelectedServices } = useBooking();

  const calculateTotalPrice = () => {
    return selectedServices.reduce((sum, service) => {
      const atHomeCharge = service.atHome ? 10 : 0;
      return sum + service.price + atHomeCharge;
    }, 0);
  };

  const totalDuration = selectedServices.reduce((sum, service) => {
    return sum + parseInt(service.duration);
  }, 0);

  const handleAtHome = (serviceId: number, checked: boolean) => {
    setSelectedServices(
      selectedServices.map((service) =>
        service.id === serviceId ? { ...service, atHome: checked } : service
      )
    );
  };

  const isButtonDisabled = () => {
    if (currentPage === "selectSalon") return selectedSalon.id === -1;
    if (currentPage === "selectServices") return selectedServices.length === 0;
    if (currentPage === "selectTime") return !selectedDate || !selectedTime;
    return false;
  };

  return (
    <div className="bg-white shadow-md md:rounded-lg overflow-hidden">
      <div className="p-4 hidden md:block">
        <div className="flex items-center mb-4">
          <img
            src={selectedSalon.imgURL}
            alt={selectedSalon.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{selectedSalon.name}</h3>
            <div className="flex items-center">
              <ReviewStars rating={selectedSalon.avgRating || 0} />{" "}
              <span className="text-sm ml-1">
                ({selectedSalon.reviews.length})
              </span>
            </div>
            <p className="text-sm text-gray-500">{selectedSalon.location}</p>
            <button
              onClick={() => setShowReviews((prev) => !prev)}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              {showReviews ? "Hide Reviews" : "View Reviews"}
            </button>
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
                    {service.duration} mins • ${service.price}
                    {service.atHome && " + $10 (at home)"}
                  </p>
                </div>

                {service.availableAtHome && (
                  <div className="flex items-center gap-1">
                    <Label
                      htmlFor={`atHome-${service.id}`}
                      className="text-sm cursor-pointer"
                    >
                      At Home
                    </Label>
                    <Checkbox
                      id={`atHome-${service.id}`}
                      checked={service.atHome || false}
                      onCheckedChange={(checked) =>
                        handleAtHome(service.id, checked as boolean)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Show Reviews Section */}
        {showReviews && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <ReviewsList reviews={selectedSalon.reviews} />
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold text-xl">
            ${calculateTotalPrice()}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {selectedServices.length} service
          {selectedServices.length !== 1 ? "s" : ""} • {totalDuration} mins
        </p>

        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onContinue}
          disabled={isButtonDisabled()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
