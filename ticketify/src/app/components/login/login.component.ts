import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData = { email: '', password: '' };

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
