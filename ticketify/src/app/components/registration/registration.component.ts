import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  user: User = { email: '', name: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Rejestracja udana', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Błąd rejestracji', error);
      }
    );
  }
}
