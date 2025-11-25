import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event';
import { Event } from '../../core/models/event';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, FormsModule,HttpClientModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class SearchComponent {
  events: Event[] = [];
  results: Event[] = [];
  keyword = '';

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(all => {
      this.events = all;
      this.results = [...all];
    });
  }

  search() {
    const kw = this.keyword.toLowerCase();
    this.results = this.events.filter(e =>
      e.title.toLowerCase().includes(kw) ||
      (e.description?.toLowerCase().includes(kw) ?? false)
    );
  }

 highlight(text?: string): string {
  if (!text || !this.keyword) return text || '';
  
  const escaped = this.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const re = new RegExp(`(${escaped})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}


  deleteEvent(id: number | undefined) {
    if (!id) return;
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents(); // اعادة تحميل بعد الحذف
    });
  }
}
