import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => (this.events = data),
      (err) => console.error(err)
    );
  }

  goToDetails(id: string): void {
    this.router.navigate(['/events', id]);
  }
}
