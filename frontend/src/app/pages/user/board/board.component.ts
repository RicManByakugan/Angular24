import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.userService.getUserConnected().subscribe(user => {
        console.log(user);
        if (user) {
          this.userData = user.useractif
        }
      })
  }

}
