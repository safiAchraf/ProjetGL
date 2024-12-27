import { useState, ReactNode } from "react";
import { BookingContext } from "./BookingContext";

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        setSelectedServices,
        selectedProfessional,
        setSelectedProfessional,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export { BookingContext };
