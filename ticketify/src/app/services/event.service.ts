import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3001/api/event';
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event);
  }

  buyTicket(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buy-ticket`, data);
  }
}
