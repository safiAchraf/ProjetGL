import { Category, Salon, Service } from "./data";

export type RegisterRes = {
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type LoginRes = {
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type SalonRes = {
  message: string;
  data: Salon[];
};

export type CategoryRes = {
  categories: Category[];
};

export type ServicesRes = {
  message: string;
  data: Service[];
};

export type AvailableHoursRes = {
  availableHours: number[];
};

export type ErrorRes = {
  message: string;
  data: null;
};
