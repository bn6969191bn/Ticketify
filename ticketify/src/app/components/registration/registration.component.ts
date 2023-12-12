import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  user: User = { email: '', name: '', password: '' };

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Rejestracja udana', response);
      },
      (error) => {
        console.error('Błąd rejestracji', error);
      }
    );
  }
}
