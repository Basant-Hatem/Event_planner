import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:5000/api/event';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // Get all events
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/all`, this.getHeaders());
  }

  // Get events organized by the logged-in user
  getOrganizedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organized`, this.getHeaders());
  }

  // Get events the user is invited to
  getInvitedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/invited`, this.getHeaders());
  }

  // Get a single event by ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event, this.getHeaders());
  }

  // Delete an event by ID (organizer only)
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }

  // Search events
  searchEvents(keyword?: string, date?: string, role?: string): Observable<Event[]> {
    let params = `?keyword=${keyword || ''}&date=${date || ''}&role=${role || ''}`;
    return this.http.get<Event[]>(`${this.apiUrl}/search${params}`, this.getHeaders());
  }
}
