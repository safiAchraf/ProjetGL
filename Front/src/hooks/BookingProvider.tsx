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
    imgURL: "",
    rating: 0.0,
    reviewCount: 0,
    location: "",
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
