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
    description: "Beauty Like never before, choose this salon please",
    avatar: "/nails.png",
    imgs: [
      "/carousel1.png",
      "/carousel2.png",
      "/carousel3.png",
      "/carousel4.png",
    ],
    location: "Los Santos",
    reviews: [
      {
        user: "Sarah M.",
        rating: 5,
        review:
          "Absolutely love this salon! My stylist was incredible with color matching and the atmosphere is so welcoming. Definitely worth every penny.",
      },
      {
        user: "Michael R.",
        rating: 4,
        review:
          "Great haircut and professional service. Would have given 5 stars but had to wait a bit past my appointment time.",
      },
      {
        user: "Jennifer L.",
        rating: 5,
        review:
          "The attention to detail here is amazing. They really listen to what you want and deliver exactly that. My new go-to salon!",
      },
    ],
  },
  {
    id: 1,
    name: "Salon 2",
    description: "Beauty Like never before, choose this salon please",
    avatar: "/coffee.png",
    imgs: ["/hair.png"],
    location: "Los Angles",
    reviews: [
      {
        user: "David K.",
        rating: 3,
        review:
          "Decent service but a bit pricey for what you get. The location is convenient though.",
      },
      {
        user: "Emma P.",
        rating: 5,
        review:
          "First time here and I'm impressed! The staff is super friendly and my highlights came out perfect. Already booked my next appointment.",
      },
      {
        user: "James W.",
        rating: 4,
        review:
          "Solid experience overall. The stylist was knowledgeable and gave good recommendations for my hair type.",
      },
    ],
  },
  {
    id: 2,
    name: "Salon 3",
    description: "Beauty Like never before, choose this salon please",
    avatar: "",
    imgs: [],
    location: "Los Santos",
    reviews: [
      {
        user: "Lisa T.",
        rating: 5,
        review:
          "Been coming here for years and never disappointed. They consistently deliver great results and the customer service is top-notch.",
      },
      {
        user: "Alex H.",
        rating: 2,
        review:
          "Not thrilled with my latest visit. The cut wasn't quite what I asked for and felt rushed through the service.",
      },
      {
        user: "Maria G.",
        rating: 4,
        review:
          "Very modern salon with skilled stylists. A bit on the expensive side but the quality makes up for it.",
      },
    ],
  },
  {
    id: 3,
    name: "Salon 4",
    description: "Beauty Like never before, choose this salon please",
    avatar: "/pedicure.png",
    imgs: ["/pedicure.png"],
    location: "Los Santos",
    reviews: [
      {
        user: "Ryan B.",
        rating: 5,
        review:
          "Outstanding service! The scalp massage during the wash was amazing and my fade turned out perfect.",
      },
      {
        user: "Sophie C.",
        rating: 3,
        review:
          "Mixed feelings. The end result was good but communication could have been better throughout the process.",
      },
      {
        user: "Tom M.",
        rating: 4,
        review:
          "Clean, professional environment and friendly staff. Good experience overall but parking can be a challenge.",
      },
    ],
  },
  {
    id: 4,
    name: "Salon 5",
    description: "Beauty Like never before, choose this salon please",
    avatar: "/manicure.png",
    imgs: ["/bg.jpg", "/nails.png"],
    location: "Tokyo",
    reviews: [],
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
    <main className="min-h-full relative">
      <Header
        title="Salons"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons"]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        Confirm
      </button>
    </main>
  );
};

export default SelectSalon;
