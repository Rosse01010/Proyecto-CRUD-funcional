import { BusRoute } from './bus-route.model';

export interface Ticket {
  id: number;
  validationCode: string;
  busRouteId: number;
  busRoute: BusRoute;
  passengerName: string;
  passengerDocument: string;
  issuedAt: string;
  travelDate: string;
  price: number;
  status: string;
}

export interface TicketDto {
  busRouteId: number;
  passengerName: string;
  passengerDocument: string;
  travelDate: string;
}
