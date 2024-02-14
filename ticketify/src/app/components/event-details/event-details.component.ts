import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
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

  buyTicket(): void {
    const data = {
      eventId: this.event.id,
      userId: this.authService.getLoggedInUser().userId,
    };

    this.eventService.buyTicket(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
