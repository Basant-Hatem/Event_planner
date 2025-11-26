import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invited-events',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './invited-events.html',
  styleUrls: ['./invited-events.css']
})
export class InvitedEventsComponent implements OnInit {
  invitedEvents: Event[] = [];
  message = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadInvitedEvents();
  }

  loadInvitedEvents() {
    this.eventService.getInvitedEvents().subscribe({
      next: (data) => this.invitedEvents = data,
      error: (err) => console.error(err)
    });
  }

  formatTime(time: string | undefined): string {
    if (!time) return '';
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
  }

  viewDetails(id: number) {
    this.router.navigate(['/events', id]);
  }

  respond(eventId: number, status: 'Going' | 'Maybe' | 'Not Going') {
    this.eventService.respondToEvent(eventId, status).subscribe({
      next: () => {this.message = `You responded '${status}' successfully!`;  setTimeout(() => this.message = '', 2000)},
     error: (err) => console.error(err)
    });
  }
}
