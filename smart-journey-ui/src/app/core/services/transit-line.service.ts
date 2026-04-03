import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransitLine, TransitLineDto } from '../models/transit-line.model';

@Injectable({ providedIn: 'root' })
export class TransitLineService {
  private apiUrl = 'http://localhost:5110/api/busroutes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TransitLine[]> {
    return this.http.get<TransitLine[]>(this.apiUrl);
  }

  getById(id: number): Observable<TransitLine> {
    return this.http.get<TransitLine>(`${this.apiUrl}/${id}`);
  }

  create(dto: TransitLineDto): Observable<TransitLine> {
    return this.http.post<TransitLine>(this.apiUrl, dto);
  }

  update(id: number, dto: TransitLineDto): Observable<TransitLine> {
    return this.http.put<TransitLine>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
