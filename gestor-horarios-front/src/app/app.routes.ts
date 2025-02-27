import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CalendarComponent } from './internal/calendar/calendar.component';
import { CalendarDayComponent } from './internal/calendar-day/calendar-day.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarDayComponent },
  { path: 'calendar/:empleado', component: CalendarComponent },
];
