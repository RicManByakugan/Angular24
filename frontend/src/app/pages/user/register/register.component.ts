import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { AuthService } from '../../../shared/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../../shared/service/subjects.service';
import { Subject } from '../../../interfaces/subject.interface';
import { AlertComponent } from '../../../component/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LoaderComponent,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatStepperModule,
    AlertComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  emailUser: string = '';
  passwordUser: string = '';
  passwordUser2: string = '';
  nomUser: string = '';
  prenomUser: string = '';
  roleUser: string = '';
  subjectUser: string = '';
  statusLoading: boolean = false;
  ResRequest: string = '';
  dataSubject: Subject[] = [];

  constructor(
    private subjectService: SubjectService,
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
      .catch((err) => this.ResRequest = "Erreur interne du serveur.");

    this.subjectService.getSubjects().subscribe((res) => {
      if (res) {
        this.dataSubject = res;
      }
    }, (error) => {
      if (error.status === 500) {
        this.ResRequest = "Erreur interne du serveur. Veuillez réessayer plus tard.";
      } else {
        this.ResRequest = "Une erreur s'est produite. Veuillez réessayer.";
      }
      this.statusLoading = false;
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.statusLoading = true;
    this.ResRequest = '';

    if (!this.emailUser || !this.roleUser || !this.passwordUser || !this.nomUser || !this.prenomUser || !this.passwordUser2) {
      this.ResRequest = 'Veuillez entrer toutes les informations requises';
      this.statusLoading = false;
      return;
    }

    if (this.passwordUser2 !== this.passwordUser) {
      this.ResRequest = 'Les mots de passe ne correspondent pas';
      this.statusLoading = false;
      return;
    }

    if (this.roleUser === 'STUDENT') {
      this.subjectUser = '';
    } else if (!this.subjectUser) {
      this.ResRequest = 'Veuillez sélectionner une matière';
      this.statusLoading = false;
      return;
    }

    this.userService
      .registerUser(
        this.nomUser,
        this.prenomUser,
        this.roleUser,
        this.subjectUser,
        this.emailUser,
        this.passwordUser
      )
      .subscribe((res) => {
        if (res.message === 'Utilisateur créé') {
          this.ResRequest = "Connectez-vous maintenant";
          this.router.navigate(['/login']);
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

}
