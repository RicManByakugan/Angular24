import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../layout/navigation/navigation.component';
import { SidenavComponent } from '../../layout/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/service/auth.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavigationComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.css'
})
export class DahsboardComponent {
  userData: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe(resUser => {
      if (resUser.useractif) {
        this.userData = resUser.useractif
        if (resUser.useractif.role == "TEACHER") {
           this.router.navigate(['/home/teacher']);
          }else{
          this.router.navigate(['/home/student']);
        }
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

}
