import { createContext } from "react";

export type Review = {
  user: string;
  rating: number;
  review: string;
};

export type Salon = {
  id: number;
  name: string;
  imgURL: string;
  location: string;
  reviews: Review[];
  avgRating?: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  availableAtHome?: boolean;
  atHome?: boolean;
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
