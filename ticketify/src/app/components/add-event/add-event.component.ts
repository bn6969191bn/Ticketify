import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  locations: any[] = [];
  categories: any[] = [];
  currentUser: any;

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.eventForm = new FormGroup({
      event_name: new FormControl('', [Validators.required]),
      date_and_time: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUser();
    this.loadLocations();
    this.loadCategories();
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => console.error(error)
    );
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => console.error(error)
    );
  }

  onLocationChange(locationId: string): void {
    this.eventForm.get('location')?.setValue(locationId);
  }

  onCategoryChange(categoryId: string): void {
    this.eventForm.get('category')?.setValue(categoryId);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData = {
        ...this.eventForm.value,
        organizer: this.currentUser.userId,
      };

      this.eventService.addEvent(eventData).subscribe(
        (data) => {
          console.log('Wydarzenie zostało dodane', data);
          this.router.navigate(['/events']);
        },
        (error) => {
          console.error('Błąd podczas dodawania wydarzenia', error);
        }
      );
    }
  }
}
