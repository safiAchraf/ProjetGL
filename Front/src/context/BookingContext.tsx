import { createContext, ReactNode, useState } from "react";
import type { Salon, Service } from "../types/data";

type BookingContextType = {
  selectedSalon: Salon;
  setSelectedSalon: React.Dispatch<React.SetStateAction<Salon>>;
  selectedServices: Service[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
  inHouseServices: { [key: string]: boolean };
  setInHouseServices: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [selectedSalon, setSelectedSalon] = useState<Salon>({
    id: "",
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    city: "",
    pictures: [],
    ownerId: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
    rating: null,
  });
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [inHouseServices, setInHouseServices] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <BookingContext.Provider
      value={{
        selectedSalon,
        setSelectedSalon,
        selectedServices,
        setSelectedServices,
        inHouseServices,
        setInHouseServices,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
