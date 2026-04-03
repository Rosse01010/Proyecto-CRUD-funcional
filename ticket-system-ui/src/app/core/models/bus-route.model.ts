export interface BusRoute {
  id: number;
  name: string;
  origin: string;
  destination: string;
  price: number;
  isActive: boolean;
}

export interface BusRouteDto {
  name: string;
  origin: string;
  destination: string;
  price: number;
  isActive: boolean;
}
