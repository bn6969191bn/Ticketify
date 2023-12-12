import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log('Zalogowano pomyślnie');
        localStorage.setItem('token', res.token);
      },
      (err) => console.error('Błąd logowania', err)
    );
  }
}
