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
  selector: 'app-resetpass',
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
    AlertComponent
  ],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {
  pass1: string = '';
  pass2: string = '';
  statusLoading: boolean = false;
  ResRequest: string = '';
  emailUser: any;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.emailUser = localStorage.getItem("emailCode")
  }

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
    if (this.emailUser === '' || this.pass1 === '' || this.pass2 === '') {
      this.ResRequest = '';
      this.ResRequest = 'Entrer les informations';
      this.statusLoading = false;
      return;
    }

    if (this.pass1 !== this.pass2) {
      this.ResRequest = '';
      this.ResRequest = 'Deux mots de passe invalide';
      this.statusLoading = false;
      return;
    }

    this.userService
      .resetUser(this.emailUser, this.pass1)
      .subscribe((res) => {
        if (res.message === 'Mot de passe réinitialisé avec succès') {
          localStorage.removeItem('emailCode');
          this.router.navigate(['/login']);
        }
        this.ResRequest = res.message;
        this.statusLoading = false;
      });
  }
}
