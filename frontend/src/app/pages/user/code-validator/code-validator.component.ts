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
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-code-validator',
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
    AlertComponent,
    MatDivider
  ],
  templateUrl: './code-validator.component.html',
  styleUrl: './code-validator.component.css'
})
export class CodeValidatorComponent {
  codeUser: string = '';
  emailUser: any;
  statusLoading: boolean = false;
  ResRequest: string = '';

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

    if (this.emailUser == undefined) {
      this.router.navigate(['/login']);
    }
  }

  resend(){
    this.statusLoading = true;
    this.ResRequest = '';
    if (this.emailUser === '') {
      this.ResRequest = '';
      this.ResRequest = "Une erreur s'est produite";
      this.statusLoading = false;
      return;
    }

    this.userService
      .resendUser(this.emailUser)
      .subscribe((res) => {
        this.ResRequest = res.message;
        this.statusLoading = false;
      });
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.statusLoading = true;
    this.ResRequest = '';
    if (this.codeUser === '' || this.emailUser === '') {
      this.ResRequest = '';
      this.ResRequest = 'Entrer les informations';
      this.statusLoading = false;
      return;
    }
    this.userService
      .codeUser(this.emailUser, parseInt(this.codeUser))
      .subscribe((res) => {
        if (res.message === 'Code vérifié avec succès') {
          this.router.navigate(['/reset']);
        }
        this.ResRequest = res.message;
        this.statusLoading = false;
      });
  }
}
