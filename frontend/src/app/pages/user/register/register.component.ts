import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { AuthService } from '../../../shared/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../component/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoaderComponent, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  emailUser: string = "";
  passwordUser: string  = "";
  passwordUser2: string  = "";
  nomUser: string = "";
  prenomUser: string = "";
  roleUser: string = "";
  statusLoading: boolean = false;
  ResRequest: string = "";


  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAdmin()
    .then(res => {
      if(res){
        this.router.navigate(['/home']);
      }
    })
    .catch(err => console.log(err))
  }

  onSubmit(event: any){
    event.preventDefault();
    this.statusLoading = true;
    this.ResRequest = ""
    if ((this.emailUser === "") || (this.passwordUser === undefined) || (this.nomUser === undefined) || (this.roleUser === undefined) || (this.passwordUser2 === undefined)) {
        this.ResRequest = ""
        this.ResRequest = "Entrer les informations"
        this.statusLoading = false;
        return
    };

    if(this.passwordUser2 !== this.passwordUser){
      this.ResRequest = ""
        this.ResRequest = "Deux mots de passe incorrecte"
        this.statusLoading = false;
        return
    }
    this.userService.registerUser(this.nomUser, this.prenomUser, this.roleUser, this.emailUser, this.passwordUser)
      .subscribe(res => {
        if(res.message === "Utilisateur créé"){
          this.router.navigate(['/login']);
          window.location.reload();
        }
        this.ResRequest = res.message
        this.statusLoading = false;
      })
  }



}
