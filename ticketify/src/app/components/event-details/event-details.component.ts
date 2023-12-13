import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(
        (data) => {
          this.event = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Wydarzenie o takim ID nie istnieje');
    }
  }
}
