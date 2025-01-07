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
  id: string;
  name: string;
  description: string;
  price: number;
  pointPrice: number;
  duration: number;
  categoryId: string;
  inHouse: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  user: string;
  rating: number;
  review: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};
