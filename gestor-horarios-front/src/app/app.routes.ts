import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CalendarComponent } from './component/calendar/calendar.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent }
];
