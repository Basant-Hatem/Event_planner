import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:5000/api/event'; // حسب الـ Flask backend URL

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('jwtToken'); // خزني التوكن بعد login
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getOrganizedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organized`, this.getHeaders());
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event, this.getHeaders());
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }
 
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organized`);
  } // دي انا محتجاها 

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/organized`); // ممكن تعدلي حسب الـ endpoint اللي بيرجع event واحد
  }
//ودي كمان 

}
//getAllEvents(): Observable<Event[]> {
    //return this.http.get<Event[]>(this.apiUrl);
 // }

 // getEventById(id: number): Observable<Event> {
   // return this.http.get<Event>(`${this.apiUrl}/${id}`);
 // }

  //createEvent(event: Event): Observable<Event> {
  //  return this.http.post<Event>(this.apiUrl, event);
  //}

  //deleteEvent(id: number): Observable<void> {
    //return this.http.delete<void>(`${this.apiUrl}/${id}`);
  //}
//}
