import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit {
  locationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.locationForm.valid) {
      this.locationService.addLocation(this.locationForm.value).subscribe({
        next: (res) => {
          console.log('Lokalizacja została dodana', res);
          this.router.navigate(['/events']);
        },
        error: (err) =>
          console.error('Błąd podczas dodawania lokalizacji', err),
      });
    } else {
      console.error('Formularz zawiera błędy', this.locationForm.errors);
    }
  }
}
