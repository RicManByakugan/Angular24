import { Component } from '@angular/core';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../component/alert/alert.component';
import { UserService } from '../../../shared/service/user.service';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [LoaderComponent,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    AlertComponent,],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  emailUser: string = '';
  statusLoading: boolean = false;
  ResRequest: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService
      .isAdmin()
      .then((res) => {
        if (res) {
          this.router.navigate(['/home/board']);
        }
      })
      .catch((err) => console.log(err));
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.statusLoading = true;
    this.ResRequest = '';
    if (this.emailUser === '') {
      this.ResRequest = '';
      this.ResRequest = 'Entrer les informations';
      this.statusLoading = false;
      return;
    }
    this.userService
      .forgotUser(this.emailUser)
      .subscribe((res) => {
        if (res.message === 'Code envoyé') {
          localStorage.setItem('emailCode', this.emailUser);
          this.router.navigate(['/code']);
        }
        this.ResRequest = res.message;
        this.statusLoading = false;
      });
  }
}
