import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Space } from '../interfaces/space.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Retorna true para disponível e false para indisponível
  checkAvailability(date: string, spaceId: number): Observable<Boolean> {
    // Formato do date: 'YYYY-MM-DD'
    return this.http.get<Boolean>(`${this.apiUrl}/reservation/checkAvaliability/${date}/ ${spaceId}`);
  }


  createReservation(date: string, spaceId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservation`, { date, spaceId });
  }
 }

