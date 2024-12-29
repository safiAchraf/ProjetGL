import { useContext } from "react";
import BookingContext from "../context/BookingContext";

const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
};

export default useBooking;
