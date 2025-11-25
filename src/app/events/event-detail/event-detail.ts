import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css'],
})
export class EventDetailComponent implements OnInit {
  event?: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe(e => (this.event = e));
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

   deleteEvent() {
  if (!this.event?.id) return;

  if (confirm('Are you sure you want to delete this event?')) {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: () => {
        alert('Event deleted successfully!');
        this.router.navigate(['/events']); // نرجع للـ list
      },
      error: (err) => {
        alert('Error deleting event: ' + (err.error?.error || 'Something went wrong'));
      }
    });
  }
}

  goBack() {
    this.router.navigate(['/events']);
  }
}
