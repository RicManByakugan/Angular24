import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
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
