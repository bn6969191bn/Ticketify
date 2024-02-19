import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData: User = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log('Zalogowano pomyślnie');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/events']);
      },
      (err) => console.error('Błąd logowania', err)
    );
  }
}
