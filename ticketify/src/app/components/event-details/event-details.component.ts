import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: Event = {
    id: '',
    event_name: '',
    date: new Date(),
    location: {
      name: '',
      address: '',
      capacity: 0,
    },
    description: '',
    organizer: {
      email: '',
      password: '',
    },
    category: {
      category_name: '',
    },
    maxNumberOfTickets: 0,
    ticketPrice: 0,
  };

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
        console.log('Bilet został zakupiony', response);
      },
      (error) => {
        console.error('Błąd podczas zakupu biletu', error);
      }
    );
  }
}
