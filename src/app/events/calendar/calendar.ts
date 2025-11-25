import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClient, HttpClientModule } from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule,HttpClientModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('eventModal') eventModal!: ElementRef;

  events: Event[] = [];
  selectedEvents: Event[] = [];
  selectedEvent?: Event;
  showEventList = false;

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getOrganizedEvents().subscribe(events => {
      this.events = events;
      this.calendarOptions.events = this.events.map(e => ({
        id: e.id.toString(),
        title: e.title,
        start: e.date + 'T' + (e.time || '00:00'),
        extendedProps: {
          description: e.description,
          location: e.location
        }
      }));
    });
  }

  handleDateClick(arg: any) {
    const dateStr = arg.dateStr;
    this.selectedEvents = this.events.filter(e => e.date === dateStr);
    this.showEventList = this.selectedEvents.length > 0;
  }

  openModal(event: Event) {
    this.selectedEvent = event;
    const modalEl: any = this.eventModal.nativeElement;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  deleteEvent(event: Event) {
    if (!event.id) return;
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event.id).subscribe({
        next: () => this.loadEvents(),
        error: err => alert('Error deleting event: ' + err)
      });
    }
  }
}
