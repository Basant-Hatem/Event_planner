import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Attendee} from '../../core/models/Attendee';
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, HttpClientModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css'],
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  message = '';
  showInviteForm = false; 
  inviteEmail = '';        
  inviteMessage = '';      

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid event ID');
      this.router.navigate(['/events']);
      return;
    }

    this.eventService.getEventById(id).subscribe({
      next: (e) => this.event = e,
      error: (err) => {
        console.error('Failed to load event:', err);
        this.router.navigate(['/events']);
      }
    });
  }

  formatTime(time: string | undefined): string {
    if (!time) return '';
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Fix for midnight/noon
    return `${hour}:${minute} ${ampm}`;
  }

  deleteEvent() {
    if (!this.event?.id) return;

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.id).subscribe({
        next: () => {
          alert('Event deleted successfully!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          alert('Error deleting event: ' + (err.error?.error || 'Something went wrong'));
          console.error(err);
        }
      });
    }
  }
   
  goBack() {
    this.router.navigate(['/events']);
  }

// دالة ارسال الدعوة
inviteUser() {
  if (!this.event?.id || !this.inviteEmail) {
    this.inviteMessage = 'Please enter a valid email.';
    return;
  }

  this.eventService.inviteUser(this.event.id, this.inviteEmail).subscribe({
    next: () => {
      this.inviteMessage = `Invitation sent to ${this.inviteEmail} successfully!`;
      this.inviteEmail = ''; 
      setTimeout(() => this.inviteMessage = '', 3000); 
    },
    error: (err) => {
      console.error(err);
      this.inviteMessage = err.error?.error || 'Failed to send invitation.';
    }
  });
}
attendees: Attendee[] = [];

showAttendance = false;    


getAttendance() {
  if (!this.event?.id) return;
  this.eventService.getAttendees(this.event.id).subscribe({
    next: (res: Attendee[]) => this.attendees = res,
    error: (err) => console.error('Failed to load attendance:', err)
  });
}

}
