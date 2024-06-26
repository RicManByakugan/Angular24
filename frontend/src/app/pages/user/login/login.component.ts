import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../component/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoaderComponent,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    RouterModule,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  emailUser: string = '';
  passwordUser: string = '';
  statusLoading: boolean = false;
  ResRequest: string = '';
  timeoutControl: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((resUser) => {
      if (resUser.useractif) {
        if (resUser.useractif.role == 'STUDENT') {
          this.router.navigate(['/home/student']);
        } else {
          this.router.navigate(['/home/teacher']);
        }
      }
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.statusLoading = true;
    localStorage.clear();
    this.ResRequest = '';
    if (this.emailUser === '' || this.passwordUser === undefined) {
      this.ResRequest = '';
      this.ResRequest = 'Entrer les informations';
      this.statusLoading = false;
      return;
    }
    this.userService
      .loginUser(this.emailUser, this.passwordUser)
      .subscribe((res) => {
        if (res.message == 'Utilisateur connecté') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.userId);
          window.location.reload();
          this.clearLoginTimeout()
          this.timeoutControl = setTimeout(() => {
            this.authService.logIn();
            if (res.role == 'STUDENT') {
              this.router.navigate(['/home/student']);
            } else {
              this.router.navigate(['/home/teacher']);
            }
          }, 500);
        }
        this.ResRequest = res.message;
        this.statusLoading = false;
      }, (error) => {
        if (error.status === 500) {
          this.ResRequest = "Erreur interne du serveur. Veuillez réessayer plus tard.";
        } else {
          this.ResRequest = "Une erreur s'est produite. Veuillez réessayer.";
        }
        this.statusLoading = false;
      });
  }

  clearLoginTimeout() {
    if (this.timeoutControl) {
      clearTimeout(this.timeoutControl);
      this.timeoutControl = null;
    }
  }
}
