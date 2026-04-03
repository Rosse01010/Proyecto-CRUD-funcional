import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoyagePass, VoyagePassDto } from '../models/voyage-pass.model';

@Injectable({ providedIn: 'root' })
export class VoyagePassService {
  private apiUrl = 'http://localhost:5110/api/voyagePasses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VoyagePass[]> {
    return this.http.get<VoyagePass[]>(this.apiUrl);
  }

  getById(id: number): Observable<VoyagePass> {
    return this.http.get<VoyagePass>(`${this.apiUrl}/${id}`);
  }

  create(dto: VoyagePassDto): Observable<VoyagePass> {
    return this.http.post<VoyagePass>(this.apiUrl, dto);
  }

  updateStatus(id: number, status: string): Observable<VoyagePass> {
    return this.http.patch<VoyagePass>(`${this.apiUrl}/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
