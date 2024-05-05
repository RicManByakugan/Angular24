import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../../shared/service/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatDividerModule, RouterLink, MatToolbarModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  userData: any;
  isConnected = false;
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAdmin()
    .then(res => {
      if(res){
        this.isConnected = true
      }else{
        this.isConnected = false
      }
    })
    .catch(err => console.log(err))

    this.userService.getUserConnected().subscribe(user => {
      if (user) {
        this.userData = user.useractif
      }
    })
  }
  
  logOut(){
    this.authService.logOut();
  }
}
