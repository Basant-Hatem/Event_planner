export interface Attendee {
  id: number;
  email: string;
  role: 'organizer' | 'attendee';
  status: 'Going' | 'Maybe' | 'Not Going' | 'Pending';
}
