import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private USER_KEY = 'luna-user-data';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {

    const options = {
      responseType: 'text' as 'json'
    };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials, options).pipe(
      tap(response => {
        console.log('Login realizado com sucesso:', response);

        const userMock = {
        token: response,
        user: { login: credentials.login }
      };
      localStorage.setItem(this.USER_KEY, JSON.stringify(userMock));
      })
    );
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getUser() {
    const data = localStorage.getItem(this.USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  
}