import { Salon, Service, User } from "./data";

export type RegisterRes = {
  message: string;
  data: User;
};

export type LoginRes = {
  message: string;
  data: User;
};

export type SalonRes = {
  message: string;
  data: Salon[];
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
