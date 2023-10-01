export interface Coords {
  x: number;
  y: number;
}

export interface School {
  idschool: number;
  name: string;
  coords: Coords;
}

export interface GqlEvent{
  start: string;
  end: string;
  summary: string;
  location: string;
  description: string;
}

export interface User {
  mail: string;
  token: string;
  name: string;
  logged: boolean;
  ical: string;
  nonce: boolean;
  school: School | null;
  favorites: Restaurant[] | null;
  refreshToken: string;
  refreshingToken: boolean;
  avatar: string;
}

export interface TEvent{
  start: Date;
  end: Date;
  summary: string;
  location: string;
  description: string;
}

export interface Food {
  names: string[];
  category: string;
}

export interface Meal {
  idmeal: number;
  typmeal: string;
  day: string;
  foodies: Food[];
}

export interface Restaurant {
  idrestaurant: number;
  url: string;
  name: string;
  distance: number;
  coords: Coords;
  meals: Meal[];
}
