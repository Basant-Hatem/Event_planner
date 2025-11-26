import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';

// Define a new type for invited events
interface InvitedEvent extends Event {
  status?: 'Going' | 'Maybe' | 'Not Going' | 'Pending'; // backend value
  response?: 'Going' | 'Maybe' | 'Not Going' | 'Pending'; // local user selection
}

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './invited-events.html',
  styleUrls: ['./invited-events.css']
})
export class UserEventsComponent implements OnInit {
  organizedEvents: Event[] = [];
  invitedEvents: InvitedEvent[] = [];
  message = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadOrganizedEvents();
    this.loadInvitedEvents();
  }

  loadOrganizedEvents() {
    this.eventService.getOrganizedEvents().subscribe({
      next: (data) => this.organizedEvents = data,
      error: (err) => console.error(err)
    });
  }

  loadInvitedEvents() {
    this.eventService.getInvitedEvents().subscribe({
      next: (data) => {
        // Initialize `response` from backend status
        this.invitedEvents = data.map(e => ({
          ...e,
          response: (e as any).status || 'Pending'
        }));
      },
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
      next: () => {
        this.message = `You responded '${status}' successfully!`;
        setTimeout(() => this.message = '', 2000);

        // Update the response immutably for Angular change detection
        const index = this.invitedEvents.findIndex(e => e.id === eventId);
        if (index > -1) {
          this.invitedEvents[index] = {
            ...this.invitedEvents[index],
            response: status
          };
        }
      },
      error: (err) => console.error(err)
    });
  }
}
