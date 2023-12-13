import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/user';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, user);
  }

  getLoggedInUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Problem with token decoding', Error);
      return null;
    }
  }
}
