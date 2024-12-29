import { createContext, ReactNode, useState } from "react";
import type { Salon, Service } from "../types/data";

type BookingContextType = {
  selectedSalon: Salon | null;
  setSelectedSalon: React.Dispatch<React.SetStateAction<Salon | null>>;
  selectedServices: Service[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
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

export default BookingContext;
