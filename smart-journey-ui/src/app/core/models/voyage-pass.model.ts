import { TransitLine } from './transit-line.model';

export interface VoyagePass {
  id: number;
  validationCode: string;
  transitLineId: number;
  transitLine: TransitLine;
  passengerName: string;
  passengerDocument: string;
  issuedAt: string;
  travelDate: string;
  price: number;
  status: string;
}

export interface VoyagePassDto {
  transitLineId: number;
  passengerName: string;
  passengerDocument: string;
  travelDate: string;
}
