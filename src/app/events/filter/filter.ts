import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css']
})
export class FilterComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedDate = '';
  dayFilter = 'all';
  daysOptions = ['all','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(all => {
      this.events = all;
      this.filteredEvents = [...all];
    });
  }

  filter() {
    this.filteredEvents = this.events.filter(e => {
      const matchesDate = !this.selectedDate || e.date === this.selectedDate;
      const matchesDay = this.dayFilter === 'all' || new Date(e.date).toLocaleDateString('en-US',{ weekday: 'long' }) === this.dayFilter;
      return matchesDate && matchesDay;
    });
  }

  deleteEvent(id: number | undefined) {
    if (!id) return;
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
      this.filter(); 
    });
  }
}
