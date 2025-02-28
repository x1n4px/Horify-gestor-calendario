import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CalendarComponent } from './internal/calendar/calendar.component';
import { CalendarDayComponent } from './internal/calendar-day/calendar-day.component';
import { EmployeeComponent } from './internal/employee/employee.component';
import { ProfileComponent } from './internal/profile/profile.component';
import { VacationsComponent } from './internal/vacations/vacations.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarDayComponent },
  { path: 'calendar/:empleado', component: CalendarComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'vacation', component: VacationsComponent },
];
