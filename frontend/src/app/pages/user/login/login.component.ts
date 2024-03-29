import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  emailUser: string = "";
  passwordUser: string  = "";
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
    if ((this.emailUser === "") || (this.passwordUser === undefined)) {
        this.ResRequest = ""
        this.ResRequest = "Entrer les informations"
        this.statusLoading = false;
        return
    };
    this.userService.loginUser(this.emailUser, this.passwordUser)
      .subscribe(res => {
        if(res.message === "Utilisateur connecté"){
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.userId);
          this.router.navigate(['/home']);
          window.location.reload();
        }
        this.ResRequest = res.message
        this.statusLoading = false;
      })
  }

}
