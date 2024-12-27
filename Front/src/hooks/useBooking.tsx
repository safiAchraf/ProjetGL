import { useContext } from "react";
import { BookingContext } from "./BookingProvider";

export const useBooking = () => {
  return useContext(BookingContext);
};
