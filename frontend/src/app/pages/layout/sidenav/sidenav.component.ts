import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatDividerModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isConnected = false;
  
  constructor(private authService: AuthService) { }

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
  }
  
  logOut(){
    this.authService.logOut();
  }
}
