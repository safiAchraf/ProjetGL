/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useBooking } from "../hooks/useBooking";

/* Custom Components */
import Header from "../components/bookingUI/header";
import SalonCard from "../components/bookingUI/salonCard";

/* Utils */
import type { Salon } from "../hooks/BookingContext";

const defaults: Salon[] = [
  {
    id: 0,
    name: "Salon 1",
    imgURL: "/nails.png",
    rating: 1.4,
    reviewCount: 3,
    location: "Los Santos",
  },
  {
    id: 1,
    name: "Salon 2",
    imgURL: "/hair.png",
    rating: 4.4,
    reviewCount: 67,
    location: "Los Angles",
  },
  {
    id: 2,
    name: "Salon 3",
    imgURL: "/manicure.png",
    rating: 7.4,
    reviewCount: 102,
    location: "Los Santos",
  },
  {
    id: 3,
    name: "Salon 4",
    imgURL: "/pedicure.png",
    rating: 3.4,
    reviewCount: 77,
    location: "Los Santos",
  },
];

const SelectSalon = () => {
  const [salons] = useState<Salon[]>(defaults);

  const { selectedSalon, setSelectedSalon } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (salons.length > 0 && selectedSalon.id == -1) {
      setSelectedSalon(salons[0]);
    }
  }, [salons, selectedSalon, setSelectedSalon]);

  return (
    <main className="min-h-full max-h-screen relative">
      <Header
        title="Salons"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons"]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {salons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              isSelected={selectedSalon.id === salon.id}
              onSelect={setSelectedSalon}
            />
          ))}
        </div>
      </section>

      <button
        onClick={() => navigate("/booking/services")}
        className="fixed bottom-8 right-8 bg-white hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Choose a salon
      </button>
    </main>
  );
};

export default SelectSalon;
