import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup';
import { LoginComponent } from './auth/login/login';
import { Landing } from './landing/landing';
import { CalendarComponent } from './events/calendar/calendar';
import { EventListComponent } from './events/event-list/event-list';
import { EventDetailComponent } from './events/event-detail/event-detail';
import { CreateEventComponent } from './events/create-event/create-event';
import { SearchComponent } from './events/search/search';
import { FilterComponent } from './events/filter/filter';
import { UserEventsComponent } from './events/invited-events/invited-events';
export const routes: Routes = [
  { path: '', component: Landing },            // الصفحة الرئيسية
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/calendar', component: CalendarComponent },
  { path: 'events/create', component: CreateEventComponent },
  { path: 'events/search', component: SearchComponent },
  { path: 'events/filter', component: FilterComponent },
    { path: 'events/invited', component: UserEventsComponent},
    { path: 'events/:id', component: EventDetailComponent },
  { path: '**', redirectTo: '' }               // أي route مش موجود يرجع Landing
];
