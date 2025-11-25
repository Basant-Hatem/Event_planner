export interface User {
  id?: number;
  name?: string;
  email: string;
  role?: 'organizer' | 'attendee';
  token?: string;
}
