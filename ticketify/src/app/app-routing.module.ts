import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
