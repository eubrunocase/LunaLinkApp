import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('Login realizado com sucesso:', response);
      })
    );
  }
}