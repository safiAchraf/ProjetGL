import { createContext, ReactNode, useState } from "react";
import type { Salon, Service } from "../types/data";

type BookingContextType = {
  selectedSalon: Salon;
  setSelectedSalon: React.Dispatch<React.SetStateAction<Salon>>;
  selectedServices: Service[];
  setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedTime: string;
  checkoutLink: string;
  setCheckoutLink: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
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
  const [price, setPrice] = useState<number>(0);
  const [checkoutLink, setCheckoutLink] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
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

  const [couponCode, setCouponCode] = useState("");

  return (
    <BookingContext.Provider
      value={{
        selectedSalon,
        checkoutLink,
        setCheckoutLink,
        price,
        setPrice,
        points,
        setPoints,
        setSelectedSalon,
        selectedServices,
        setSelectedServices,
        inHouseServices,
        setInHouseServices,
        couponCode,
        setCouponCode,
        setSelectedDate,
        setSelectedTime,
        selectedDate,
        selectedTime,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
