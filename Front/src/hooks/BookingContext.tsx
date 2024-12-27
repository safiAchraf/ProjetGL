import { createContext } from "react";

interface BookingContextType {
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  selectedProfessional: any;
  setSelectedProfessional: (professional: any) => void;
}

export const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType
);
