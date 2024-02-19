import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../models/auth.model';
import { RegisteredUser } from '../models/registeredUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/user';
  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedInStatus$ = this.loggedInStatus.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<RegisteredUser> {
    return this.http.post<RegisteredUser>(`${this.apiUrl}/create`, user);
  }

  loginUser(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, user).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.updateLoggedInStatus();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updateLoggedInStatus();
  }

  updateLoggedInStatus(): void {
    this.loggedInStatus.next(this.isLoggedIn());
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdminOrOrganizer(): boolean {
    const user = this.getLoggedInUser()?.role;
    return user === 'admin' || user === 'organizer';
  }

  getLoggedInUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken;
    } catch (Error) {
      console.error('Problem with token decoding', Error);
      return null;
    }
  }
}
