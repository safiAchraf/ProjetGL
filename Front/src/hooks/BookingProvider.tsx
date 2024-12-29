import { useState, ReactNode } from "react";
import { BookingContext } from "./BookingContext";

import type { Salon, Service } from "./BookingContext";

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [selectedSalon, setSelectedSalon] = useState<Salon>({
    id: -1,
    name: "",
    description: "",
    imgs: [],
    location: "",
    reviews: [],
    avgRating: 0,
  });
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  return (
    <BookingContext.Provider
      value={{
        selectedSalon,
        setSelectedSalon,
        selectedServices,
        setSelectedServices,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export { BookingContext };
