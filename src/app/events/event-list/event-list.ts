import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  message = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error(err)
    });
  }

  deleteEvent(id: number) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.message = 'Event deleted successfully!';
        this.events = this.events.filter(e => e.id !== id);
        setTimeout(() => this.message = '', 2000);
      },
      error: (err) => {
        this.message = 'Failed to delete event.';
        console.error(err);
      }
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
}
