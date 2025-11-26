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
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`, this.getHeaders());
  }

  // Create a new event
  createEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, event, this.getHeaders());
  }

  // Invite a user to an event
  inviteUser(eventId: number, inviteeEmail: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/invite`,
      { event_id: eventId, email: inviteeEmail },
      this.getHeaders()
    );
  }

  // Respond to an event
  respondToEvent(eventId: number, status: 'Going' | 'Maybe' | 'Not Going'): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/respond`,
      { event_id: eventId, status },
      this.getHeaders()
    );
  }

  // Get attendees for an event
  getAttendees(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attendees/${eventId}`, this.getHeaders());
  }

  // Delete an event
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${eventId}`, this.getHeaders());
  }

  // Search events
  searchEvents(keyword?: string, date?: string, role?: string): Observable<Event[]> {
    let params = `?keyword=${keyword || ''}&date=${date || ''}&role=${role || ''}`;
    return this.http.get<Event[]>(`${this.apiUrl}/search${params}`, this.getHeaders());
  }
}
