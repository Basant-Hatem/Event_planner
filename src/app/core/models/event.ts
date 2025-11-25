export interface Event {
  id: number;
  title: string;
  date: string;   // ISO format: 2025-11-24
  time?: string;  // '14:00'
  location?: string;
  description?: string;
  organizerId?: number;
  attendees?: number; // optional count
    userRole?: 'organizer' | 'attendee'; 
}
