export type Picture = {
  id: string;
  url: string;
  salonId: string;
  createdAt: string;
  updatedAt: string;
};

export type Salon = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phoneNumber: string;
  pictures: Picture[];
  ownerId: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  rating: number | null;
};

export type Service = {
  id?: string;
  name: string;
  description: string;
  price: number;
  pointPrice: number;
  duration: number;
  category: Categories;
  inHouse: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Review = {
  user: string;
  rating: number;
  review: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  points: number;
};

export type Reservation = {
  id: string;
  client: string;
  services: string[];
  bookDate: string;
  amount: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
};

export type Categories = "Hair" | "Skin Care" | "Nails" | "Makeup" | "Massage";

export type UpdateUserPayload = Partial<User> & {
  currentPassword?: string;
  newPassword?: string;
};

export type Coupon = {
  id?: string;
  code: string;
  discount: number;
  salonId?: string;
  createdAt?: string;
  updatedAt?: string;
};
