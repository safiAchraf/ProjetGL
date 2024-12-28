import { createContext } from "react";

export type Salon = {
  id: number;
  name: string;
  imgURL: string;
  rating: number;
  reviewCount: number;
  location: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  inHome?: boolean;
};

interface BookingContextType {
  selectedSalon: Salon;
  setSelectedSalon: React.Dispatch<React.SetStateAction<Salon>>;
  selectedServices: Service[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType
);
