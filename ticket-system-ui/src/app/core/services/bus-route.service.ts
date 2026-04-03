import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusRoute, BusRouteDto } from '../models/bus-route.model';

@Injectable({ providedIn: 'root' })
export class BusRouteService {
  private apiUrl = 'http://localhost:5110/api/busroutes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BusRoute[]> {
    return this.http.get<BusRoute[]>(this.apiUrl);
  }

  getById(id: number): Observable<BusRoute> {
    return this.http.get<BusRoute>(`${this.apiUrl}/${id}`);
  }

  create(dto: BusRouteDto): Observable<BusRoute> {
    return this.http.post<BusRoute>(this.apiUrl, dto);
  }

  update(id: number, dto: BusRouteDto): Observable<BusRoute> {
    return this.http.put<BusRoute>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
