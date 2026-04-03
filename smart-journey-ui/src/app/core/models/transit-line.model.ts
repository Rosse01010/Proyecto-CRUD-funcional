export interface TransitLine {
  id: number;
  name: string;
  origin: string;
  destination: string;
  price: number;
  isActive: boolean;
}

export interface TransitLineDto {
  name: string;
  origin: string;
  destination: string;
  price: number;
  isActive: boolean;
}
