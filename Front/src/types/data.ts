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
  category: string;
  inHouse: boolean;
  createdAt: string;
  updatedAt: string;
};
