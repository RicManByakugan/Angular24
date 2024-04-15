import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  @Input() callback: any;
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
